import logging

from paho.mqtt.client import Client
from app.webapi import BrokerCredentials
from app.config import MessengerConfig


def on_connect(client, userdata, flags, rc):
    logging.info("Connected with result code %s", rc)


def create_messenger_client(config: MessengerConfig, credentials: BrokerCredentials) -> Client:
    client = Client()
    client.on_connect = on_connect
    client.tls_set()

    client.username_pw_set(credentials.user, credentials.password)
    client.connect(config.broker_uri, config.port, 60)
    return client
