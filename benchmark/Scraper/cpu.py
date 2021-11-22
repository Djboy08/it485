import json
import requests
from bs4 import BeautifulSoup

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

url = "https://www.techpowerup.com/cpu-specs/"
req = requests.get(url, headers)
# f2 = open("blah.soup", "r")
soup = BeautifulSoup(req.content, 'html.parser')
#list > table > tbody > tr:nth-child(1) > td:nth-child(1)

class ScrapeCPUs():
    def __init__(self, soup):
        self._soup = soup
        self.parse_table()
        # f2.close()
        # self.parse_specs()
        # self.parse_fps()

        # self.build_data()
        # loop through container

    def parse_table(self):
        rows = self._soup.select("tr")
        rows = [row.text.strip().split("\n") for row in rows]
        
        self._CPUS = {}
        rows.reverse()
        rows.pop()
        rows.reverse()
        rows.pop(0)
        for row in rows:
            row.pop(1)
            row.reverse()
            print(row)


            name = row.pop()
            codename = row.pop()
            cores = row.pop()
            clock = row.pop()
            socket = row.pop()
            process = row.pop()
            L3Cache = row.pop()
            Tdp = row.pop()
            Released = row.pop()
            self._CPUS[name] = {
                "name": name,
                "codename": codename,
                "cores": cores,
                "clock": clock,
                "socket": socket,
                "process": process,
                "L3Cache": L3Cache,
                "Tdp": Tdp,
                "Released": Released
            }
            temp = open("./cpus/"+name + ".json", "w") 
            json.dump(self._CPUS[name], temp, indent=4, sort_keys=True)
            # temp.close()
            print(self._CPUS[name])
            print("---------------")
        
    def getData(self):
        return self._CPUS


scraper = ScrapeCPUs(soup)
print(scraper.getData())
# data = scraper.get_data().str()

# f = open("blah.soup", "w")

# write the html from soup to the file
# f.write(soup.prettify())
# f.close()
# print(data)

# print(scraper)
# print(soup.prettify())