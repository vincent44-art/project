import os
from app import create_app, db
from app.models import User, Incident
from flask_migrate import Migrate

config_name = os.getenv('FLASK_CONFIG') or 'default'
app = create_app(config_name)
migrate = Migrate(app, db)

# This allows you to use 'flask shell' with pre-imported models
@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, Incident=Incident)

if __name__ == '__main__':
    app.run()