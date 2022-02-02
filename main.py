import requests
import json
from flask import Flask, render_template, jsonify, request
from datetime import date
from markupsafe import escape

app = Flask(__name__)


@app.route("/")
def hello_world():

    currency = ['AUD', 'USD', 'GBP']
    date_now = date.today()

    assets = requests.get('https://api.coincap.io/v2/assets?limit=10')
    datas = []
    tab_head = ['Rank', 'Name', 'Price', 'Currency']
    if assets.status_code == 200:
        for d in assets.json()['data']:
            datas.append({
                'id': d['id'],
                'name': d['name'],
                'rank': d['rank'],
                'priceUsd': d['priceUsd'],
                'currency': 'USD'
            })

    print(f'Datas => {datas}')
    return render_template('index.html', tab_head=tab_head, datas=datas, currency=currency, date=date_now)


@app.route('/api/coins', methods=['GET'])
def get_coins():

    get_nbr_pages = request.args.get('page')
    get_nbr_results = request.args.get('nbrResults')

    print(f'get_nbr_pages => {get_nbr_pages}')
    print(f'get_nbr_results => {get_nbr_results}')

    args = f'?vs_currency=usd&price_change_percentage=1h,24h,7d'
    nbr_result = f'&per_page={get_nbr_results}' if get_nbr_results else '&per_page=10'
    nbr_page = f'&page={get_nbr_pages}' if get_nbr_pages else ''

    print(f'NbrPages => {nbr_page}')

    args += nbr_result + nbr_page
    print(f'New args => {args}')



    # print(f'nbr_results => {nbr_result}')
    # if get_nbr_pages:
    #     args += f'&page={get_nbr_pages}'
    


    print(f'final args => {args}')
    
    print(f'https://api.coingecko.com/api/v3/coins/markets{args}')
    assets = requests.get(f'https://api.coingecko.com/api/v3/coins/markets{args}')

    if assets.status_code == 200:
        datas = assets.json()
        return jsonify({
            'status': 200,
            'data': datas
        })
    else:
        return jsonify({
            'status': 300
        })


@app.route('/api/coins/change/<id>/<currency>')
def get_coins_change(id, currency):

    args = f'?vs_currency={currency}&ids={id}'
    assets = requests.get(f'https://api.coingecko.com/api/v3/coins/markets{args}')
    data = assets.json()[0]['current_price']
    return jsonify({
        'status': '200',
        'data': data
    })
    


@app.route('/api/cryptos', defaults={'limit': 10, 'offset':0 })
@app.route("/api/cryptos/<limit>/<offset>")
def crypto(limit, offset):

    args = f'?limit={limit}&offset={offset}'
    assets = requests.get(f'https://api.coincap.io/v2/assets{args}')
    datas = []
    if assets.status_code == 200:
        for d in assets.json()['data']:
            datas.append({
                'id': d['id'],
                'name': d['name'],
                'rank': d['rank'],
                'priceUsd': d['priceUsd'],
            })

    # print(f'DATAS => {datas}')
    return jsonify({
        'status': 'ok',
        'data': datas
    })


@app.route("/api/crypto_history/<crypto_name>")
def crypto_history(crypto_name):
    return f'Choosen crypto => {crypto_name}'

    # return f'Crypto function here'


@app.route("/api/change/<currency>/<int:amount>")
def change(currency, amount):
    currency_u = currency.upper()

    if request.method == 'GET':
        print('je susi GET')
        print(f'ARGS => {request.args.get("page", "")}')
    else:
        print('je suis LAAAAA')

    page = request.args.get('page', default = 1, type = int)
    args = request.args
    print(f'args +> ', page)


    return f'Change => {currency} && amount => {amount}'


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
