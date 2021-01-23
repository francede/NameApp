from flask import Blueprint, request
from src.namedb import NameDB
import json

api_blueprint = Blueprint("api_endpoints", __name__)

name_db = NameDB("res/names.json")


@api_blueprint.route("/names", methods=["GET"])
def get_names():
    order_by = request.args.get("order_by", "default").lower()
    print(order_by)

    if order_by == "name":
        return json.dumps({"names": name_db.select_names_by_name_asc()}), 200
    elif order_by == "amount":
        return json.dumps({"names": name_db.select_names_by_amount_dsc()}), 200
    else:
        return json.dumps({"names": name_db.select_names()}), 200


@api_blueprint.route("/name/<string:name>", methods=["GET"])
def get_name(name):
    name = name_db.select_name(name)
    print(name)
    if name is None:
        return json.dumps({"msg": "Name not found"}), 404
    return json.dumps(name), 200


@api_blueprint.route("/sum", methods=["GET"])
def get_amount():
    return json.dumps({"sum": name_db.select_sum_of_amounts()})

