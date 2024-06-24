import requests

url = "http://20.244.56.144/test/auth"
data = {'companyName': 'Afformed', 
        'clientID': '3c615a72-8d0d-4f2f-920d-df0128c10ad8',
        'clientSecret': 'ugNWvsnJQmdmFfrP', 
        'ownerName': 'Sai Raju', 
        'ownerEmail': 'jyothisairaju999@gmail.com', 
        'rollNo': '21kb5a0511'}

response = requests.post(url, json=data)

print(response.json())