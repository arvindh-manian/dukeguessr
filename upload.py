import sys
import psycopg2
import boto3
from GPSPhoto import gpsphoto
from dotenv import dotenv_values
import os

#from PIL import Image
#from PIL.ExifTags import TAGS

def get_env_data_as_dict(path: str) -> dict:
    return dotenv_values(path)

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    client = boto3.client(
    's3',
    aws_access_key_id = env["ACCESS_KEY"],
    aws_secret_access_key = env["SECRET_KEY"],
    region_name = 'us-east-1'
    )
    
    # save the name of the file (excluding the path to it) as the object_name

    object_name = os.path.basename(file_name)

    url = f"https://{bucket}.s3.us-east-1.amazonaws.com/{object_name}"
    try:
        with open(file_name, "rb") as f:
            client.upload_fileobj(f, bucket, object_name)#, extra_args={'ServerSideEncryption': "AES256"})
    except (Exception) as error:
        print(error)
        return False
    return url

env = get_env_data_as_dict(".env.local")
#exif_data = {}
#GPSINFO_TAG = 34853
BUCKET_NAME = "dukeguessrbucket"

if len(sys.argv) != 2:
    raise Exception(f"One arguments expected, {len(sys.argv) - 1} arguments given.\n Appropriate syntax: python3 upload.py imagepath.jpg")

img_path = sys.argv[1]
if not img_path.lower().endswith(('.png', '.jpg', '.jpeg')):
    exit()
#print(img_path)

link = upload_file(img_path, BUCKET_NAME)
#print(link)

try:
    data = gpsphoto.getGPSData(img_path)
    #print(data['Latitude'], data['Longitude'])
except (Exception) as error:
    print("Error getting GPS data", error)

'''
try:
    image = Image.open(img_path)
    exif_raw = image.getexif()
    gpsraw = exif_raw.get_ifd(GPSINFO_TAG)
    gpsinfo = {}
    for key in exif_raw['GPSInfo'].keys():
        decode = ExifTags.GPSTAGS.get(key,key)
        gpsinfo[decode] = exif['GPSInfo'][key]
    

except (Exception) as error:
    print("Error extracting image data", error)

if exif_raw is None:
    print('Sorry, image has no exif data.')
    exit()
else:
    for key, val in exif_raw.items():
        if key in TAGS:
            exif_data[TAGS[key]] = val
'''
connection = psycopg2.connect(database=env["DB_NAME"],
                    host=env["DB_HOST"],
                    user=env["DB_USER"],
                    password=env["DB_PASSWORD"],
                    port=env["PORT"],
                    sslmode='verify-full',
                    sslrootcert=env["SSL_ROOT_CERT_PATH"])

try:
    cursor = connection.cursor()
    print("Executing SQL Insert...")
    query = "INSERT INTO Location VALUES (DEFAULT, %s, %s, %s);"
    cursor.execute(query , (link, data['Latitude'], data['Longitude']))
    connection.commit()
except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)
finally:
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")