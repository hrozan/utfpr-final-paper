import logging

import requests

from app.config import ApiConfig


class BrokerCredentials:
    def __init__(self, user, password):
        self.password = password
        self.user = user


class ApiService:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url
        self.token = token

    def get_broker_credentials(self) -> BrokerCredentials:
        url = self.base_url + "/broker"
        response = requests.get(url, headers={'token': self.token})
        if response.status_code != 200:
            logging.error("Fail to get broker credentials, status code %s", response.status_code)
            # todo: throw exception

        body = response.json()
        return BrokerCredentials(body['user'], body['password'])


def create_api_service(config: ApiConfig) -> ApiService:
    """
    Login to the api and create a serve with a valid api token

    :param config: Api configuration object
    :return: ApiService with valid token
    """
    url = config.base_url + "/auth/login"
    payload = {
        'email': config.email,
        'password': config.password
    }

    response = requests.post(url, payload)
    if response.status_code != 200:
        logging.error("Fail to login, status code %s", response.status_code)
        # todo: throw exception

    body = response.json()
    return ApiService(config.base_url, body['token'])
