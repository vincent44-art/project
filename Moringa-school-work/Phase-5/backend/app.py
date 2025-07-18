from flask import Flask, jsonify
from config import Config
from models import db, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from routes.auth_routes import auth_bp
from routes.incident_routes import incident_bp
from routes.admin_routes import admin_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    jwt = JWTManager(app)

    # This function is called whenever a protected endpoint is accessed,
    # and it will load the user object from the database into the JWT claims.
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.get(identity)

    # Add admin claim to JWT
    @jwt.additional_claims_loader
    def add_claims_to_access_token(user):
        return {"is_admin": user.is_admin}

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(incident_bp)
    app.register_blueprint(admin_bp)
    
    # Simple root endpoint
    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Ajali! Incident Reporting API"})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)