from flask import Flask, json, jsonify, request
from flask_cors import CORS, cross_origin
from AmazonResultsScrap import getAmazonResults
from FlipkartResultsScrap import getFlipkartSearch
from Results import getAllResults
from AmazonPriceTrack import getAmazonPrice
from FlipkartPriceTrack import getFlipkartPrice
from scrapper import send_mail
app = Flask(__name__)
CORS(app, support_credentials = True)

@app.route('/get/amazon/<search>', methods=["GET"])
def get_AmazonResults(search):
    return getAmazonResults(search)

@app.route('/get/flipkart/<search>', methods=["GET"])
def get_FlipkartResults(search):
    return getFlipkartSearch(search)

@app.route('/get/results/<search>', methods=["GET"])
def getResults(search):
    return getAllResults(search)



@app.route('/pricecheck', methods=["POST"])
@cross_origin(supports_credentials = True)
def price_check():
    websiteType = request.json['type']
    url = request.json['url']
    u=""+url
    if(websiteType == "amazon"):
        res = getAmazonPrice(u)
    elif (websiteType == "flipkart"):
        res= getFlipkartPrice(u)
    response = jsonify(res)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/sendmail', methods=["POST"])
@cross_origin(supports_credentials = True)
def a():
    email = request.json['email']
    websiteType = request.json['type']
    url = request.json['url']
    price = request.json['price']
    url =url+':url'
    send_mail(url,email,price)
    response = jsonify({"web":websiteType,"type":'aa',"u":url})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == "__main__":
    app.run(debug=True)