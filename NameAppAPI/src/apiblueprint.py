from flask import Blueprint, request
from src.namedb import NameDB
import json

api_blueprint = Blueprint("api_endpoints", __name__)

name_db = NameDB("../res/names.json")
"""
print(name_db.select_names_by_amount_dsc())
print(name_db.select_names_by_name_asc())
print(name_db.select_name("Janne"))
print(name_db.select_name("afea"))
print(name_db.select_name("liisa"))
print(name_db.select_sum_of_amounts())
"""


@api_blueprint.route("/names", methods=["GET"])
def get_names():
    order_by_name = request.form.get("orderByName", "None").lower == "true"

    if order_by_name:
        return json.dumps({"names": name_db.select_names_by_name_asc()}), 200
    else:
        return json.dumps({"names": name_db.select_names_by_amount_dsc()}), 200


@api_blueprint.route("/name/<string:name>", methods=["GET"])
def get_name(name):
    name = name_db.select_name(name)
    print(name)
    if name is None:
        return json.dumps({"msg": "Name not found"}), 404
    return json.dumps(name), 200


@api_blueprint.route("/amount", methods=["GET"])
def get_amount():
    return json.dumps({"sum_of_amounts": name_db.select_sum_of_amounts()})

