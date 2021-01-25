import json
import logging
import time

from app.config import get_config, DEVELOPMENT
from app.network import mqtt_client_factory, fetch_broker_config
from app.system import get_system_information

DATA_TOPIC = 'system/data'


def main():
    app_config = get_config()
    print("Starting application")

    if app_config.env == DEVELOPMENT:
        print("Running in development")
        logging.basicConfig(level=logging.DEBUG)

    broker_config = fetch_broker_config(app_config)
    client = mqtt_client_factory(broker_config)

    while True:
        payload = get_system_information()

        client.publish(DATA_TOPIC, json.dumps(payload))
        logging.info("Published in %s %s", DATA_TOPIC, payload)
        time.sleep(2)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
