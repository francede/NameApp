from flask import Flask

from src.apiblueprint import api_blueprint

app = Flask(__name__)

app.register_blueprint(api_blueprint, url_prefix="/api")

if __name__ == "__main__":
    app.run()
