from flask import Blueprint, request, jsonify
from app.models import Incident
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

incident_bp = Blueprint('incidents', __name__)

@incident_bp.route('/incidents', methods=['POST'])
@jwt_required()
def create_incident():
    data = request.get_json()
    current_user_id = get_jwt_identity()

    # Input validation
    required_fields = ['title', 'description', 'latitude', 'longitude']
    if not all(field in data for field in required_fields):
        return jsonify({"msg": "Missing required fields"}), 400

    incident = Incident(
        title=data['title'],
        description=data['description'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        media_url=data.get('media_url'),
        video_url=data.get('video_url'),
        user_id=current_user_id
    )
    db.session.add(incident)
    db.session.commit()

    return jsonify(incident.to_dict()), 201

@incident_bp.route('/incidents', methods=['GET'])
@jwt_required()
def get_incidents():
    incidents = Incident.query.order_by(Incident.created_at.desc()).all()
    return jsonify([incident.to_dict() for incident in incidents]), 200

@incident_bp.route('/incidents/<int:id>', methods=['GET'])
@jwt_required()
def get_incident(id):
    incident = Incident.query.get_or_404(id)
    return jsonify(incident.to_dict()), 200

@incident_bp.route('/incidents/<int:id>', methods=['PUT'])
@jwt_required()
def update_incident(id):
    incident = Incident.query.get_or_404(id)
    current_user_id = get_jwt_identity()

    if incident.user_id != current_user_id:
        return jsonify({"msg": "Permission denied: you can only edit your own reports"}), 403

    data = request.get_json()
    incident.title = data.get('title', incident.title)
    incident.description = data.get('description', incident.description)
    incident.latitude = data.get('latitude', incident.latitude)
    incident.longitude = data.get('longitude', incident.longitude)
    incident.media_url = data.get('media_url', incident.media_url)
    incident.video_url = data.get('video_url', incident.video_url)
    
    db.session.commit()
    return jsonify(incident.to_dict()), 200

@incident_bp.route('/incidents/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_incident(id):
    incident = Incident.query.get_or_404(id)
    current_user_id = get_jwt_identity()

    if incident.user_id != current_user_id:
        return jsonify({"msg": "Permission denied: you can only delete your own reports"}), 403

    db.session.delete(incident)
    db.session.commit()
    return jsonify({"msg": "Incident deleted successfully"}), 200