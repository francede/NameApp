import json


class NameDB:
    def __init__(self, filename):
        with open(filename) as json_file:
            self.name_data = json.load(json_file)["names"]
            print(self.name_data)

    def select_names(self):
        return self.name_data

    def select_names_by_amount_dsc(self):
        return sorted(self.name_data, key=lambda k: k["amount"], reverse=True)

    def select_names_by_name_asc(self):
        return sorted(self.name_data, key=lambda k: k["name"])

    def select_name(self, name):
        for item in self.name_data:
            if item["name"].lower() == name.lower():
                return item
        return None

    def select_sum_of_amounts(self):
        total = 0
        for item in self.name_data:
            total = total + item["amount"]
        return total
