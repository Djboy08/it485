import sys
import logging
import rds_config
import pymysql
import json
#rds settings
rds_host  = rds_config.host
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)


import datetime




import requests
import json
from bs4 import BeautifulSoup

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

url = "https://www.gpucheck.com/graphics-cards"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, 'html.parser')

class ScrapeGPUs():
    def __init__(self, soup):
        self._soup = soup
        self.parse_names()
        self.parse_specs()
        self.parse_fps()

        self.build_data()
        # loop through container

    def parse_names(self):
        names = soup.select('body > div.container > div.row div > strong')
        names = [name.text for name in names]
        self._names = names

    def parse_specs(self):
        year = soup.select('body > div.container > div.row > div.col-xl-8  span.badge.badge-primary')
        year = [name.text for name in year]
        memory = soup.select('body > div.container > div.row > div.col-xl-8  span.badge.badge-info')
        memory = [name.text for name in memory]
        price = soup.select('body > div.container > div.row > div.col-xl-8  span.badge.badge-danger')
        price = [name.text[2::] for name in price]
        self._year = year
        self._memory = memory
        self._price = price

    def parse_fps(self):
        fps_collection = soup.select('.progress-bar.bg-success')
        collection_1080p = []
        collection_1440p = []
        collection_4k = []

        fps = [fps.text for fps in fps_collection]
        for i in range(len(fps)):
            fps_split = fps[i].split(':')
            fpsRaw = fps_split[1].split(" ")[1]
            if fps_split[0] == '1080p':
                collection_1080p.append(fpsRaw)
            elif fps_split[0] == '1440p':
                collection_1440p.append(fpsRaw)
            elif fps_split[0] == '4K':
                collection_4k.append(fpsRaw)

        self._collection_1080p = collection_1080p
        self._collection_1440p = collection_1440p
        self._collection_4k = collection_4k
    
    def build_data(self):
        data = {}
        for i in range(len(self._names)):
            data[self._names[i]] = {
                'year': self._year[i],
                'memory': self._memory[i],
                'price': self._price[i],
                '1080p': self._collection_1080p[i],
                '1440p': self._collection_1440p[i],
                '4K': self._collection_4k[i]
            }
        self._data = data

    def get_data(self):
        return self._data

scraper = ScrapeGPUs(soup)
data = scraper.get_data()



try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

# INSERT INTO `BenchpressDB`.`GPUs` (`gpu_id`, `model`, `released`, `memory`, `price`, `fps1080`, `fps1440`, `fps4K`) VALUES ('2', 'Testing Name', '0000-00-00', '6', '7', '1', '2', '3');

def handler():
    """
    This function fetches content from MySQL RDS instance
    """

    item_count = 0
    sql = ""
    with conn.cursor() as cur:
        # cur.execute("create table Employee ( EmpID  int NOT NULL, Name varchar(255) NOT NULL, PRIMARY KEY (EmpID))")
        # cur.execute('insert into Employee (EmpID, Name) values(1, "Joe")')
        # cur.execute('insert into Employee (EmpID, Name) values(2, "Bob")')
        # cur.execute('insert into Employee (EmpID, Name) values(3, "Mary")')
        # conn.commit()
        arr = []
        sqlHeader = "INSERT INTO `BenchpressDB`.`GPUs` (`model`, `released`, `memory`, `price`, `fps1080`, `fps1440`, `fps4K`) VALUES "
        for index in data:
            x = datetime.datetime(int(data[index]["year"]), 1, 1)
            sql = f'("{index}", "{x}", "{data[index]["memory"]}", "{data[index]["price"]}","{data[index]["1080p"]}", "{data[index]["1440p"]}", "{data[index]["4K"]}")'
            arr.append(sql)
            print(sql)

        results = ", ".join(arr)
        results +=";"

        results = sqlHeader + results
        print(results)
        cur.execute(results)
        conn.commit()

    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }

handler()