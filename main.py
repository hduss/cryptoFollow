import requests
import json
from flask import Flask
from flask import render_template

from markupsafe import escape

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template('test.html')

@app.route("/api/cryptos")
def crypto():

    assets = requests.get('https://api.coincap.io/v2/assets')
    crypto_response = {}
    print(f'Json statut => {assets.status_code}')
    if assets.status_code == 200:
        print('je suis la')
        crypto_response = assets.json()

        print(json.dumps(crypto_response['data'], indent=2))

        # for key, value in response.items():
        #     for v in value:
        #         crypto_response[key] = v

    return render_template('index.html', crypto=crypto_response['data'], crypto_timestamps=crypto_response['timestamp'])


@app.route("/api/crypto_history/<crypto_name>")
def crypto_history(crypto_name):

    return f'Choosen crypto => {crypto_name}'


    # return f'Crypto function here'

@app.route("/api/test")
def test():
    test_dict = {
      "data": [
        {
          "id": "bitcoin",
          "rank": "1",
          "symbol": "BTC",
          "name": "Bitcoin",
          "supply": "17193925.0000000000000000",
          "maxSupply": "21000000.0000000000000000",
          "marketCapUsd": "119150835874.4699281625807300",
          "volumeUsd24Hr": "2927959461.1750323310959460",
          "priceUsd": "6929.8217756835584756",
          "changePercent24Hr": "-0.8101417214350335",
          "vwap24Hr": "7175.0663247679233209"
        },
        {
          "id": "ethereum",
          "rank": "2",
          "symbol": "ETH",
          "name": "Ethereum",
          "supply": "101160540.0000000000000000",
          "maxSupply": False,
          "marketCapUsd": "40967739219.6612727047843840",
          "volumeUsd24Hr": "1026669440.6451482672850841",
          "priceUsd": "404.9774667045200896",
          "changePercent24Hr": "-0.0999626159535347",
          "vwap24Hr": "415.3288028454417241"
        },
      ]
    }

    print(test_dict['data'])

    # for key, value in test_dict.items():
    #
    #     for v in value:
    #         return f'v => {v}'
    #     return f'key => {key}'

    # for value in test[0]:
    #     print(value)

    return render_template('index.html', crypto=test_dict['data'])


