from app.webapi import create_api_service
from app.config import ApiConfig


def test_create_api_service_successfully(mocker):
    mock_response = MockResponse()
    mocker.patch('requests.post', return_value=mock_response)
    api_config = ApiConfig("http://localhost:3000", "higor@email.com", "pass123")
    api_service = create_api_service(api_config)
    assert api_service.token == mock_response.token


class MockResponse:
    def __init__(self):
        self.status_code = 200
        self.token = "asdfcasdfa"

    def json(self):
        return {
            "token": self.token
        }
