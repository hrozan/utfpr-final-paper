import logging
import time

import psutil

from app.messenger import create_messenger_client
from app.webapi import create_api_service
from app.config import Config


def run():
    config = Config.get()
    logging.info("🚀 Start")

    api_service = create_api_service(config.api)
    credentials = api_service.get_broker_credentials()
    messenger_client = create_messenger_client(config.messenger, credentials)

    while True:
        system_cpu_percent = psutil.cpu_percent()
        system_memory_percent = psutil.virtual_memory().percent

        messenger_client.publish("stats/cpu", system_cpu_percent)
        logging.info("Published in stats/cpi (%s)", system_cpu_percent)

        messenger_client.publish("stats/memory", system_memory_percent)
        logging.info("Published in stats/memory (%s)", system_memory_percent)

        time.sleep(2)


if __name__ == '__main__':
    try:
        run()
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
