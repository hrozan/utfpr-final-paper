import logging
import requests
from paho.mqtt.client import Client


class BrokerConfig:
    def __init__(self, uri: str, port: int, user: str, password: str):
        self.uri = uri
        self.port = port
        self.password = password
        self.user = user
        self.keep_alive = 60


def mqtt_client_factory(config: BrokerConfig) -> Client:
    client = Client()

    def on_connect():
        logging.info("Connected with result code ")

    client.on_connect = on_connect
    client.tls_set()
    client.username_pw_set(config.user, config.password)

    client.connect(config.uri, config.port, config.keep_alive)
    return client


def fetch_broker_config(config) -> BrokerConfig:
    base_url = config.api_url

    login_url = base_url + "/auth/login"
    payload = {
        'email': config.api_email,
        'password': config.api_password
    }
    response = requests.post(login_url, payload)
    token = response.json().get('token')

    broker_url = base_url + "/broker"
    response = requests.get(broker_url, headers={'token': token})

    broker_user: str = response.json().get('user')
    broker_password: str = response.json().get('password')

    broker_config = BrokerConfig(
        uri=config.broker_uri,
        port=config.broker_port,
        user=broker_user,
        password=broker_password
    )
    return broker_config
