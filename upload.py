import sys
import psycopg2
from PIL import Image
from PIL.ExifTags import TAGS

def get_env_data_as_dict(path: str) -> dict:
    with open(path, 'r') as f:
       return dict(tuple(line.replace('\n', '').split('=')) for line
                in f.readlines() if not line.startswith('#'))

env = get_env_data_as_dict(".env.local")
sql_path = sys.argv[1]

try:
    connection = psycopg2.connect(database=env["DB_NAME"],
                        host=env["DB_HOST"],
                        user=env["DB_USER"],
                        password=env["DB_PASSWORD"],
                        port="5432")
    cursor = connection.cursor()
    print("Executing SQL Query...")
    cursor.execute("SELECT * FROM Account;")

    for row in cursor:
        print(row)

except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)

finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")