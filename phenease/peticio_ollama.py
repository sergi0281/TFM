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
        #"format": "json"
        #"type": "object",
        # "format": {
        #    "type":"object",
        #    "properties": {
        #        "nameGene": {
        #            "type": "string"
        #     },
        #        "idGene": {
        #            "type": "string"
        #        }
        #    }
      #},
    }
    #response = requests.post(url, json=data, timeout=60)
    response = requests.post(url, json=data, timeout=60)
    response.raise_for_status()
    print(json.loads(response.content)['response'])
    #print(response.json()["response"])
    noms = re.findall(r'"nameGene"\s*:\s*"([^"]+)"', json.loads(response.content)['response'])
    print(noms)
    #return response.json()["response"]
    return noms
    #print("la resposta és:", resposta)  # Això es veu a la consola del servidor

    #return JsonResponse({'resposta': resposta})  # Això es veu al navegador/API



#prompt="list 5 cities from arround the world and their countries"
#prompt="give 5 GeneName with its GeneId from NCBI froms genes afected due to these phenotypical features: Abnormal dental morphology, Abnormality of the nail, Abnormal hair morphology, Punctate palmoplantar hyperkeratosis"
#model="mistral"

#query_ollama(prompt,model)

#import subprocess

#def query_ollama(prompt, model="llama3"):
#    try:
#        command = f'ollama run {model} --prompt "{prompt}"'
#        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True)
#        return result.stdout.strip()
#    except subprocess.CalledProcessError as e:
#        return f"Error en executar la comanda: {e.stderr}"