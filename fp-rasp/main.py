import ssl
import uuid
import paho.mqtt.client as mqtt
import psutil
import time
import json
import requests
import logging
import bluetooth

MQTT_HOST = 'hrozan.xyz'
MQTT_PORT = 8883
CLIENT_ID = str(uuid.uuid4())
CERTIFICATE_PATH = '/etc/ssl/certs/DST_Root_CA_X3.pem'

logging.basicConfig(level=logging.DEBUG)


def get_broker_credentials():
    login_url = "https://api.hrozan.xyz/auth/login"
    credential_url = "https://api.hrozan.xyz/mqtt/credentials"

    with open('credentials.json', 'r') as file:
        data = file.read()

    credentials = json.loads(data)
    response = requests.post(login_url, json=credentials)
    user_data = response.json()
    token = user_data['token']

    headers = {"Authorization": token}
    response = requests.get(credential_url, headers=headers)
    return response.json()


def connect_mqtt(credentials):
    client = mqtt.Client(client_id=CLIENT_ID, clean_session=False)
    client.username_pw_set(credentials["userName"], credentials["password"])
    client.tls_set(CERTIFICATE_PATH, tls_version=ssl.PROTOCOL_TLSv1_2)
    client.connect(host=MQTT_HOST, port=MQTT_PORT)
    return client


def send_data(client):
    while True:
        data = {
            'cpu': psutil.cpu_percent(),
            'memory': psutil.cpu_percent(),
            'temp': psutil.cpu_percent()
        }

        payload = str(json.dumps(data))
        logging.debug(payload)
        client.publish(topic="main", payload=payload, qos=0, retain=False)
        time.sleep(2)


def main():
    logging.debug("Start Connection")
    credentials = get_broker_credentials()
    logging.debug("Credentials Success")
    client = connect_mqtt(credentials)
    logging.debug("Connected Success")
    send_data(client)


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print("Err: ", e)
