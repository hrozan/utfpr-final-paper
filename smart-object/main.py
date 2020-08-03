import logging
import time

from app.config import Config
from app.messenger import create_messenger_client
from app.system import get_system_data_json
from app.webapi import create_api_service


def run():
    config = Config.get()
    logging.info("🚀 Start")

    api_service = create_api_service(config.api)
    credentials = api_service.get_broker_credentials()
    messenger_client = create_messenger_client(config.messenger, credentials)

    while True:
        payload = get_system_data_json()

        messenger_client.publish("system/data", payload)
        logging.info("Published in system/data: %s", payload)

        time.sleep(2)


if __name__ == '__main__':
    try:
        run()
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
