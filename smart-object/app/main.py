import logging
import time

from config import load_config
from network import create_mqtt_client, get_broker_credentials
from system import get_system_data_json


def main():
    logging.info("🚀 Starting Application")

    credentials = get_broker_credentials()
    messenger_client = create_mqtt_client(credentials)

    while True:
        payload = get_system_data_json()

        messenger_client.publish("system/data", payload)
        logging.info("Published in system/data: %s", payload)

        time.sleep(2)


if __name__ == '__main__':
    try:
        load_config()
        main()
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
    except KeyError as error:
        logging.error("Fail to load configurations: %s ", error)
        exit(1)
