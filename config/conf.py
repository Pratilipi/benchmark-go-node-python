import os

STAGE = 'local' if 'STAGE' not in os.environ else os.environ['STAGE']

AWS_REGION = 'ap-south-1'
if STAGE in ("devo", "gamma", "prod"):
    KAFKA_CONFIG = {'bootstrap.servers': os.environ['KAFKA_BROKER_URL'],
                    'schema.registry.url': os.environ['SCHEMA_REGISTRY_URL']}
elif STAGE == "local":
    KAFKA_CONFIG = {
        'bootstrap.servers': 'ip-172-31-0-76.ap-south-1.compute.internal:9092',
        'schema.registry.url': 'http://ip-172-31-0-76.ap-south-1.compute.internal:8081'
    }
