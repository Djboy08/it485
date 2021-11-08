import requests
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
        price = [name.text for name in price]
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
            fps_split = fps[i].split(':')[0]
            if fps_split == '1080p':
                collection_1080p.append(fps[i])
            elif fps_split == '1440p':
                collection_1440p.append(fps[i])
            elif fps_split == '4K':
                collection_4k.append(fps[i])

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
data = scraper.get_data().__str__()

# f = open("demofile2.txt", "w")
# f.write(data)
# f.close()
print(data)

# print(scraper)
# print(soup.prettify())