import requests

try:
    response = requests.get("http://localhost:11434")
    print(response.text)
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")