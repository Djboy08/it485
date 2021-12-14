import sys
import logging
import rds_config
import pymysql
import json
import uuid
import re
import datetime

#rds settings
rds_host  = rds_config.host
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def company(item):
    if item.lower().find("amd") != -1 | item.lower().find("ryzen") != -1:
        return "AMD"
    elif item.lower().find("core") != -1:
        return "Intel"
    elif item.lower().find("nvidia") != -1:
        return "Nvidia"
    else:
        return "AMD"

def fetch(cur, sql):
    cur.execute(sql)
    all = cur.fetchall()
    logger.info(all)
    return all




logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """
    try:
        conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=15, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
    compareData = {}

    guid = event["queryStringParameters"]["guid"]
    gameName = event["queryStringParameters"]["gameName"]
    partList = {}
    gameData = {}
    gpuData = {}
    cpuData = {}
    with conn.cursor() as cur:
        # fetch part list
        sql = f'SELECT * FROM BenchpressDB.userPartList WHERE `guid` = "{guid}";'
        # cur.execute(sql)
        partList = fetch(cur, sql)[0]

        # fetch game data
        sql = f'SELECT * FROM BenchpressDB.Games WHERE `GameName` = "{gameName}";'
        # cur.execute(sql)
        gameData = fetch(cur, sql)[0]

        # fetch GPU data
        sql = f'SELECT * FROM BenchpressDB.GPUs WHERE `model` = "{partList["gpuModel"]}";'
        # cur.execute(sql)
        gpuData = fetch(cur, sql)[0]

        # fetch CPU data
        sql = f'SELECT * FROM BenchpressDB.CPUs WHERE `model` = "{partList["cpuModel"]}";'
        # cur.execute(sql)
        cpuData = fetch(cur, sql)[0]

        partList["ram"] = float(partList["ram"])
        gameData["RAM"] = float(gameData["RAM"])
        if partList["ram"] >= gameData["RAM"]:
            compareData["ram"] = True
        else:
            compareData["ram"] = False


        if company(gpuData["model"]) == "Nvidia":
            gpuToCompare = gameData["GPU_req_nvidia"]
            sql = f'SELECT * FROM BenchpressDB.GPUs WHERE `model` = "{gpuToCompare}";'
            gpuToCompare = fetch(cur, sql)[0]

            if gpuData["fps1080"] < gpuToCompare["fps1080"]:
                compareData["gpu"] = False
            else:
                compareData["gpu"] = True
        elif company(gpuData["model"]) == "AMD":
            gpuToCompare = gameData["GPU_req_amd"]
            sql = f'SELECT * FROM BenchpressDB.GPUs WHERE `model` = "{gpuToCompare}";'
            gpuToCompare = fetch(cur, sql)[0]

            if gpuData["fps1080"] < gpuToCompare["fps1080"]:
                compareData["gpu"] = False
            else:
                compareData["gpu"] = True

        if company(cpuData["model"]) == "Intel":
            cpuToCompare = gameData["CPU_req_intel"]
            sql = f'SELECT * FROM BenchpressDB.CPUs WHERE `model` = "{cpuToCompare}";'
            cpuToCompare = fetch(cur, sql)[0]
            date = cpuData["released"].split("-")
            cpuData["released"] = datetime.date(int(date[0]), int(date[1]), int(date[2]))
            date2 = cpuToCompare["released"].split("-")
            cpuToCompare["released"] = datetime.date(int(date2[0]), int(date2[1]), int(date2[2]))
            if cpuData["released"] < cpuToCompare["released"]:
                compareData["cpu"] = False
            else:
                compareData["cpu"] = True
        elif company(cpuData["model"]) == "AMD":
            cpuToCompare = gameData["CPU_req_amd"]
            sql = f'SELECT * FROM BenchpressDB.CPUs WHERE `model` = "{cpuToCompare}";'
            cpuToCompare = fetch(cur, sql)[0]
            date = cpuData["released"].split("-")
            cpuData["released"] = datetime.date(int(date[0]), int(date[1]), int(date[2]))
            date2 = cpuToCompare["released"].split("-")
            cpuToCompare["released"] = datetime.date(int(date2[0]), int(date2[1]), int(date2[2]))
            if cpuData["released"] < cpuToCompare["released"]:
                compareData["cpu"] = False
            else:
                compareData["cpu"] = True
        cur.close()

    conn.close()
    return {
        'statusCode': 200,
        'body': json.dumps(compareData)
    }

# print(handler({"queryStringParameters": {"guid": "e8b3eb0b", "gameName": "Overwatch"}}, {}))