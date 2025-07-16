from flask import Blueprint, request, jsonify
from app.models import Incident
from app import db
from app.utils.decorators import admin_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/incidents/<int:id>/status', methods=['PUT'])
@admin_required()
def update_incident_status(id):
    incident = Incident.query.get_or_404(id)
    data = request.get_json()

    new_status = data.get('status')
    valid_statuses = ['under_investigation', 'rejected', 'resolved']

    if not new_status or new_status not in valid_statuses:
        return jsonify({"msg": f"Invalid status. Must be one of: {valid_statuses}"}), 400

    incident.status = new_status
    db.session.commit()
    
    return jsonify(incident.to_dict()), 200