import sys
import ssl
import os
import uuid
import paho.mqtt.client as mqtt

MQTT_HOST = 'hrozan.xyz'
MQTT_PORT = 8883
USER_NAME = os.environ['MQTT_USER_NAME']
PASSWORD = os.environ['MQTT_PASSWORD']
CLIENT_ID = str(uuid.uuid4())
CERTIFICATE_PATH = '/etc/ssl/certs/DST_Root_CA_X3.pem'


def on_connect(client):
    client.subscribe("test")


def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))


def connect_broker():
    client = mqtt.Client(client_id=CLIENT_ID, clean_session=False)
    client.username_pw_set(USER_NAME, PASSWORD)
    client.tls_set(CERTIFICATE_PATH, tls_version=ssl.PROTOCOL_TLSv1_2)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(host=MQTT_HOST, port=MQTT_PORT)
    return client


def run():
    client = connect_broker()
    client.loop_forever()


if __name__ == '__main__':
    try:
        run()
    except Exception as e:
        print(e)
        sys.exit(1)

    sys.exit(0)
