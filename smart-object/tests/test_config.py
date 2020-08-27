from app.config import load_config


def test_get_config():
    config = load_config()
    assert config
