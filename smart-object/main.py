import logging
import requests
import paho.mqtt.client as mqtt

if __name__ == '__main__':
    # todo: use .env to configure logs level
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("Start")

    # todo: put this in .env
    url = "http://localhost:3000"

    # region login to server and get a token
    login_url = url + "/auth/login"
    login_response = requests.post(login_url, data={'email': 'higor@email.com', 'password': 'pass123'})
    if login_response.status_code != 200:
        logging.error("Fail to login, status code %s", login_response.status_code)

    login_response_body = login_response.json()
    token = login_response_body['token']
    # endregion

    # region get broker credentials
    broker_credentials_url = url + "/broker"
    broker_credential_response = requests.get(broker_credentials_url, headers={'token': token})
    if broker_credential_response.status_code != 200:
        logging.error("Fail to get broker credentials, status code %s", login_response.status_code)
    broker_credentials = broker_credential_response.json()
    broker_username = broker_credentials['user']
    broker_password = broker_credentials['password']
    # endregion

    # todo: login to broker
    client = mqtt.Client()

    def on_connect(client, userdata, flags, rc):
        logging.info("Connected with result code %s", rc)
        client.subscribe("test")


    def on_message(client, userdata, msg):
        logging.info("%s - %s", msg.topic, msg.payload)

    client.on_connect = on_connect
    client.on_message = on_message
    client.tls_set()

    client.username_pw_set(username=broker_username, password=broker_password)
    broker_url = "hrozan.xyz"
    client.connect(broker_url, 8883, 60)

    client.loop_forever()
