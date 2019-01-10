from confluent_kafka import KafkaError
from confluent_kafka.avro import AvroConsumer
from confluent_kafka.avro.serializer import SerializerError
import time
from concurrent.futures import ThreadPoolExecutor, wait
import boto3
from config import conf
from datetime import datetime

KAFKA_BROKER_URL = conf.KAFKA_CONFIG["bootstrap.servers"]
SCHEMA_REGISTRY_URL = conf.KAFKA_CONFIG["schema.registry.url"]


c = AvroConsumer({
    'bootstrap.servers': KAFKA_BROKER_URL,
    'group.id': 'testGrp',
    'schema.registry.url': SCHEMA_REGISTRY_URL})

c.subscribe(['userPratilipiEventAggregated'])

pool = ThreadPoolExecutor(20)

dynamodb = boto3.resource('dynamodb', region_name=conf.AWS_REGION)

table = dynamodb.Table('user_pratilipi')


def pushEventToDB(msg):
    data = msg["data"]
    pratilipi_id = msg["pratilipiId"]
    date = datetime.fromtimestamp(data["readTime"]/1000).strftime("%d-%m-%Y %H:%M:%S")
    item = {
        'userId': int(data['userId']),
        'pratilipiId': int(pratilipi_id),
        'lastVisitedAt': date,
        'readWordCount': int(data["readWordCount"]),
        'removedFromHistory': "False",
        'updatedAt': date,
        'lastReadChapterId': data["lastReadChapterId"]
    }

    response = table.put_item(
        Item=item
    )

    print(response)


if __name__ == '__main__':

    while True:
        try:
            try:
                print("poll start")
                msg = c.poll(1)
                print("polled")

            except SerializerError as e:
                print("Message deserialization failed for {}: {}".format(msg, e))
                break

            if msg is None:
                print("no new msg")
                continue

            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    print(msg.error())
                    break

            print("{} {} {}".format(msg.key(), msg.value(), msg.partition()))
            pushEventToDB(msg.value())
        except Exception as err:
            print(err)
            continue
        # futures.append(pool.submit(pushEventToDB, msg.value()))
        #
        # if len(futures)%1000 == 0:
        #     wait(futures, timeout=60)

    c.close()
