from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import config

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_name):
    """Application factory function."""
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    from .routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')

    from .routes.incident_routes import incident_bp
    app.register_blueprint(incident_bp, url_prefix='/api')
    
    from .routes.admin_routes import admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api')

    return app