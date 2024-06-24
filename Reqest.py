import requests

url = "http://20.244.56.144/test/register"
data = {
    "companyName": "Afformed",
    "ownerName": "Sai Raju",
    "rollNo": "21kb5a0511",
    "ownerEmail": "jyothisairaju999@gmail.com",
    "accessCode": "nbYNBp"
}

response = requests.post(url, json=data)

print(response.json())