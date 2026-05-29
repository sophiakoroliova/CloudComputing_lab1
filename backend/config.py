from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://todouser:todopass@localhost:5432/tododb"
    app_host: str = "0.0.0.0"
    app_port: int = 8080

    class Config:
        env_file = ".env"


settings = Settings()
