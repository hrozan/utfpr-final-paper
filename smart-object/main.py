import logging
import time

import paho.mqtt.client as mqtt
import psutil

from config import Config
from services import ApiService

if __name__ == '__main__':
    config = Config()

    logging.info("🚀 Start")

    api_service = ApiService(config.api)
    username, password = api_service.get_broker_credentials()

    # region Connect to broker
    client = mqtt.Client()


    def on_connect(client, userdata, flags, rc):
        logging.info("Connected with result code %s", rc)


    client.on_connect = on_connect
    client.tls_set()

    client.username_pw_set(username, password)
    broker_url = "hrozan.xyz"
    client.connect(broker_url, 8883, 60)

    # endregion

    try:
        while True:
            system_cpu_percent = psutil.cpu_percent()
            system_memory_percent = psutil.virtual_memory().percent

            client.publish("stats/cpu", system_cpu_percent)
            logging.info("Published in stats/cpi (%s)", system_cpu_percent)

            client.publish("stats/memory", system_memory_percent)
            logging.info("Published in stats/memory (%s)", system_memory_percent)

            time.sleep(2)
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
