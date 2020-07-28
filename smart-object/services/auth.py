import logging

import requests


class AuthConfig:
    def __init__(self, base_url: str, email: str, password: str):
        self.base_url = base_url
        self.email = email
        self.password = password


class AuthService:
    def __init__(self, config: AuthConfig):
        self.config = config
        self.token = self.__login()

    def __login(self) -> str:
        url = self.config.base_url + "/auth/login"
        payload = {
            'email': self.config.email,
            'password': self.config.password
        }

        response = requests.post(url, payload)
        if response.status_code != 200:
            logging.error("Fail to login, status code %s", response.status_code)
            # todo: throw exception

        body = response.json()
        return body['token']

    def get_broker_credentials(self) -> (str, str):
        url = self.config.base_url + "/broker"
        response = requests.get(url, headers={'token': self.token})
        if response.status_code != 200:
            logging.error("Fail to get broker credentials, status code %s", response.status_code)
            # todo: throw exception

        body = response.json()
        return body['user'], body['password']
