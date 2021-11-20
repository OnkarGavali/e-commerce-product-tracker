from flask import Flask, jsonify, request
from flask_cors import CORS
from AmazonResultsScrap import getAmazonResults
from FlipkartResultsScrap import getFlipkartSearch
from Results import getAllResults

app = Flask(__name__)
CORS(app)

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
def price_check():
    websiteType = request.json['websiteType']
    url = request.json['url']
    url =url+':url'
    return jsonify({"web":websiteType,"type":'aa',"u":url})


if __name__ == "__main__":
    app.run(debug=True)