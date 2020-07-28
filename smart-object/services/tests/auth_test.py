from services.auth import AuthConfig, AuthService


def test_login():
    config = AuthConfig("http://localhost:3000", "higor@email.com", "pass123")
    service = AuthService(config)
    assert service.token is not None
