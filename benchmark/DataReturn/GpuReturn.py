import sys
import logging
import rds_config
import pymysql
import json
import uuid

#rds settings
rds_host  = rds_config.host
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name

logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
def handler(event, context):
    """
    This function fetches content from MySQL RDS instance
    """
    Gpuname = event["queryStringParameters"]["Gpuname"]
    with conn.cursor() as cur:
        sql = f'SELECT * FROM BenchpressDB.GPUs WHERE `Gpuname` = "{Gpuname}";'
        cur.execute(sql)
        partList = cur.fetchone()
        # conn.commit()

    return {
        sql
    }