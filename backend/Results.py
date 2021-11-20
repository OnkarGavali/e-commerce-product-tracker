from AmazonResultsScrap import getAmazonResults
from FlipkartResultsScrap import  getFlipkartSearch
import json
import random

def getAllResults(sv):
    search = sv
    x = getAmazonResults(search)
    y = getFlipkartSearch(search)
    res_dict = x + y

    to_json = json.dumps(res_dict)
    print(res_dict)
    return to_json

