import json

def save_to_json(data, filename):
    """
    Saves article data to a JSON file. Overwrites the content of the file each time
    """
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

