import ssl
import os
import uuid
import paho.mqtt.client as mqtt
import psutil
import time
import json

MQTT_HOST = 'hrozan.xyz'
MQTT_PORT = 8883
USER_NAME = os.environ['MQTT_USER_NAME']
PASSWORD = os.environ['MQTT_PASSWORD']
CLIENT_ID = str(uuid.uuid4())
CERTIFICATE_PATH = '/etc/ssl/certs/DST_Root_CA_X3.pem'


def main():
    client = mqtt.Client(client_id=CLIENT_ID, clean_session=False)
    client.username_pw_set(USER_NAME, PASSWORD)
    client.tls_set(CERTIFICATE_PATH, tls_version=ssl.PROTOCOL_TLSv1_2)
    client.connect(host=MQTT_HOST, port=MQTT_PORT)

    while True:
        data = {
            'cpu': psutil.cpu_percent(),
            'memory': psutil.cpu_percent(),
            'temp': psutil.cpu_percent()
        }

        payload = json.dumps(data)

        client.publish(topic="main", payload=str(payload), qos=0, retain=False)
        time.sleep(2)

    pass


if __name__ == '__main__':
    main()
