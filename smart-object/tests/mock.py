class MockResponse:
    def __init__(self, body=None, status_code=200):
        if body is None:
            body = {}
        self.body = body
        self.status_code = status_code

    def json(self):
        return self.body


class MockClient:
    def __init__(self):
        self.on_connect = None
        pass

    def tls_set(self):
        pass

    def username_pw_set(self, user, password):
        pass

    def connect(self, broker_uri, port, keep_alive):
        pass
