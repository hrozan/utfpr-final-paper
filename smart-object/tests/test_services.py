from services import ApiConfig, ApiService


def test_login(monkeypatch):
    config = ApiConfig("http://localhost:3000", "higor@email.com", "pass123")
    service = ApiService(config)
    assert service.token is not None
