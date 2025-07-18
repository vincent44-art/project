from flask import Blueprint, request, jsonify
from models import db, Incident
from flask_jwt_extended import jwt_required
from utils.decorators import admin_required

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/incidents/<int:id>/status', methods=['PUT'])
@jwt_required()
@admin_required()
def update_incident_status(id):
    incident = Incident.query.get_or_404(id)
    data = request.get_json()
    new_status = data.get('status')

    allowed_statuses = ['under_investigation', 'rejected', 'resolved', 'pending']
    if not new_status or new_status not in allowed_statuses:
        return jsonify({"msg": f"Invalid status. Must be one of: {', '.join(allowed_statuses)}"}), 400

    incident.status = new_status
    db.session.commit()
    return jsonify(incident.to_dict()), 200