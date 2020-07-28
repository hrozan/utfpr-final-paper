import logging
import time

import paho.mqtt.client as mqtt
import psutil
from services.auth import AuthConfig, AuthService

if __name__ == '__main__':
    # todo: use .env to configure logs level
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("Start")

    # todo: put this in .env
    auth_config = AuthConfig("http://localhost:3000", "higor@email.com", "pass123")
    auth_service = AuthService(auth_config)
    username, password = auth_service.get_broker_credentials()

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
            logging.info("published in stats/cpi (%s)", system_cpu_percent)

            client.publish("stats/memory", system_memory_percent)
            logging.info("published in stats/memory (%s)", system_memory_percent)

            time.sleep(2)
    except KeyboardInterrupt:
        logging.info("exit")
        exit(0)
