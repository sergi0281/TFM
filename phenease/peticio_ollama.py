import requests
import json
import re
#import subprocess

def query_ollama(prompt, model):
    print("imprimeixo prompt i model a la query per ollama")
    print(prompt)
    print(model)

    url = 'http://localhost:11434/api/generate'
    data = {
        "model": model,
        "prompt": prompt,
        "stream": False,
    }
    response = requests.post(url, json=data, timeout=60)
    response.raise_for_status()
    print(json.loads(response.content)['response'])
    noms = re.findall(r'"nameGene"\s*:\s*"([^"]+)"', json.loads(response.content)['response'])
    print(noms)
    return noms
    