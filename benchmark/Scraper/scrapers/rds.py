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

    item_count = 0
    results = []

    with conn.cursor() as cur:
        # cur.execute("create table Employee ( EmpID  int NOT NULL, Name varchar(255) NOT NULL, PRIMARY KEY (EmpID))")
        # cur.execute('insert into Employee (EmpID, Name) values(1, "Joe")')
        # cur.execute('insert into Employee (EmpID, Name) values(2, "Bob")')
        # cur.execute('insert into Employee (EmpID, Name) values(3, "Mary")')
        # conn.commit()
        cur.execute("SELECT * FROM BenchpressDB.CPUs;")
        # for row in cur:
        #     # item_count += 1
        #     # logger.info(row)
        results = cur.fetchall()
        
        logger.info(results[0])
        for result in results:
            x = result["released"].strftime('%m/%d/%Y')
            result["released"] = x
            # result["released"] = t.strftime('%m/%d/%Y')
            
        # conn.commit()

    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }