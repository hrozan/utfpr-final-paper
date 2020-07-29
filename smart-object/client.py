import logging

import paho.mqtt.client as mqtt

from services.api import ApiConfig, ApiService

if __name__ == '__main__':
    # todo: use .env to configure logs level
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("Start")

    # todo: put this in .env
    auth_config = ApiConfig("http://localhost:3000", "higor@email.com", "pass123")
    auth_service = ApiService(auth_config)
    username, password = auth_service.get_broker_credentials()

    # region Connect to broker
    client = mqtt.Client()


    def on_connect(client, userdata, flags, rc):
        logging.info("Connected with result code %s", rc)
        client.subscribe("stats/cpu")
        client.subscribe("stats/memory")


    def on_message(client, userdata, msg):
        logging.info("On %s : %s", msg.topic, str(msg.payload))


    client.on_connect = on_connect
    client.on_message = on_message
    client.tls_set()

    client.username_pw_set(username, password)
    broker_url = "hrozan.xyz"
    client.connect(broker_url, 8883, 60)

    # endregion

    try:
        client.loop_forever()
    except KeyboardInterrupt:
        logging.info("Exited")
        exit(0)
