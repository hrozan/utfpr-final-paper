import logging
import requests
from paho.mqtt.client import Client
from config import config, BROKER_URI, BROKER_PORT, API_URL, API_EMAIL, API_PASSWORD


class BrokerCredentials:
    def __init__(self, user, password):
        self.password = password
        self.user = user


def create_mqtt_client(credentials: BrokerCredentials) -> Client:
    broker_uri = config[BROKER_URI]
    broker_port = config[BROKER_PORT]

    client = Client()

    def on_connect(client, userdata, flags, rc):
        logging.info("Connected with result code %s", rc)

    client.on_connect = on_connect

    client.tls_set()

    client.username_pw_set(credentials.user, credentials.password)
    client.connect(broker_uri, broker_port, 60)
    return client


def get_broker_credentials() -> BrokerCredentials:
    token = login_to_webapi()

    base_url = config[API_URL]
    url = base_url + "/broker"
    response = requests.get(url, headers={'token': token})
    if response.status_code != 200:
        logging.error("Fail to get broker credentials, status code %s", response.status_code)
        raise Exception

    body = response.json()

    username: str = body.get('user')
    password: str = body.get('password')
    return BrokerCredentials(username, password)


def login_to_webapi() -> str:
    """
    Login to the api and return a authentication token
    :return: Authentication token
    """

    base_url = config[API_URL]
    email = config[API_EMAIL]
    password = config[API_PASSWORD]

    url = base_url + "/auth/login"
    payload = {
        'email': email,
        'password': password
    }

    response = requests.post(url, payload)
    if response.status_code != 200:
        logging.error("Fail to login, status code %s", response.status_code)
        raise Exception

    logging.debug("Logged to api successfully")
    body = response.json()
    return body.get('token')
