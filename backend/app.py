from flask import Flask, jsonify, request
from flask_cors import CORS
from AmazonResultsScrap import getAmazonResults
from FlipkartResultsScrap import getFlipkartSearch

app = Flask(__name__)
CORS(app)

@app.route('/get/amazon/', methods=["GET"])
def get_AmazonResults():
    return getAmazonResults("Hp Laptop")

@app.route('/get/flipkart/', methods=["GET"])
def get_FlipkartResults():
    return getFlipkartSearch("Hp Laptop")


@app.route('/pricecheck', methods=["POST"])
def price_check():
    websiteType = request.json['websiteType']
    url = request.json['url']
    url =url+':url'
    return jsonify({"web":websiteType,"type":'aa',"u":url})


if __name__ == "__main__":
    app.run(debug=True)