"""Flask app for Cupcakes"""
import os
from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake

app= Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///cupcakes')
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)


@app.get("/api/cupcakes")
def get_all_cupcakes():
    """Return JSON for all cupcakes - ..."""

    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """Return JSON for an individual cupcake."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.post('/api/cupcakes')
def create_cupcake():
    """Create a cupcake in DB and returns JSON for cupcake."""

    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    image_url = request.json['image_url'] or None

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image_url=image_url)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return ((jsonify(cupcake=serialized)), 201)


@app.patch('/api/cupcakes/<int:cupcake_id>')
def update_cupcake(cupcake_id):
    """Update cupcake in DB and return JSON for cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    data = request.json

    cupcake.flavor = data.get("flavor", cupcake.flavor)
    cupcake.size = data.get("size", cupcake.size)
    cupcake.rating = data.get("rating", cupcake.rating)
    if "image_url" in data:
        cupcake.image_url = data['image_url'] or "https://tinyurl.com/demo-cupcake"

    db.session.commit()

    return jsonify(cupcake=cupcake.serialize())


@app.delete('/api/cupcakes/<int:cupcake_id>')
def delete_cupcake(cupcake_id):
    """Delete cupcake in DB and return JSON for deleted cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return (jsonify(deleted=cupcake_id))


@app.get('/')
def get_homepage():

    return render_template('index.html')