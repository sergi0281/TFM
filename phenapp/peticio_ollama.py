import requests
import json

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
        "type": "object",
         "format": {
            "type":"object",
            "properties": {
                "nameGene": {
                    "type": "string"
             },
                "idGene": {
                    "type": "string"
                }
            }
      },
    }
    response = requests.post(url, json=data, timeout=60)
    response.raise_for_status()
    print(json.loads(response.content)['response'])
    return response.json()["response"]

prompt="give 5 GeneName with its GeneId from NCBI froms genes afected due to these phenotypical features: Abnormal dental morphology, Abnormality of the nail, Abnormal hair morphology, Punctate palmoplantar hyperkeratosis"
model="mistral"

