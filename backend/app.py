from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from AmazonPriceTrack import getAmazonPrice
from FlipkartPriceTrack import getFlipkartPrice
import smtplib
import datetime 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import  firestore


app = Flask(__name__)
CORS(app, support_credentials = True)


cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "mp2-auth",
  "private_key_id": "05bf118244bf795128815ef5e048139bb43af589",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6hJv/6Ps2m3ht\niD3KXEI1Q1JTBXd4XxN8dv1TEj9Y9QltCSFwP1v6CttPPeRDrquLPh5OnjFUyQTQ\nVyjS8of7mtOj/ngDb2EQ+jJGrcyNT7ns+ZcIVtL6JLhi0bQjTXYHZ+7mWqgw07Io\nlf914RrBZWHqnGOt4k8W1osOzRQxx4AA9Ng+7Zo4oRCGyaiP5IRdkM7CTLSUxaYi\n4TV+1A6u/0JG0xsvyoKblF/PctkzaTSHZd8IIqzhoVLMrqhXR8do/oi0Jk0gVTj2\nd0WLLTlc71TcxYs4DLWxx3swQDBs49h+5UZMD7c5dH2/sFevB9Z2VQg+gvSUOtG2\nuZKzmS7HAgMBAAECggEABKK6G9dRsw7pzyhv3LaD9hNDxF4iP4LMFwUAESSmyr0L\nAcOUf1fbydr442nMNrsXIWFRsIOHAgPy/i3vDPshJ77hMWC9i9xPTcmMyVaVexJM\nXS2WNDYFjVkEn37LGtuDKkuffj3U6KMXo6GYFU5wc0u5Q3L6mT5C1/RMxXk8XhZR\nHzAwTe8ia0R6edwTtmUcj790jDbs8DkqbJSlDIxY/9oOvN4XiLSN/nBDKaYSZVjz\n7TAfGUHfN3TssTthQrmg/SZpRjX3vWBi4ZhIKIW7Kl2M37YDDc3QQUnHApK+Ba/U\nQ9W4qCKrb34gEvVvhiZNWiqr3hVTTkPB6qT6OlUG0QKBgQD7cxZRvmKMEhsjh1VE\ndvFQyL9rywJ0SWia69QZ9gJTzeg7SRbXcQStr5hVfbzdVrjb5xtZ86f8MXTUPTq0\no5YcGv852xz9yLu0Kpw3f2474twnhvXEE7a6oOW59FUkvo5+kosyvhvMtX6cxH9g\n4ugXRsfwENu8iunLwmqXlxpN1wKBgQC95LU+a+Ke6td71hx4dIBsa2bOfpAxZHe9\nOJyvonrjKVNkTuMMUrS/asdSIfKJ7ZuwHscBBpnJjC+4FdieeW2pFjE4fA9Q9uv3\nD2mDiIdFVvdmPcG43l1bu/rhh4CaFgj5r0Smh2EIHbabvFKZxFGzHWu3lb8ZgWis\nuYSsepKokQKBgQCOr2b56eQ4Aco+pfwfxrL3GYNuIpv46vMd/ja0qKH3dj+S7M22\nYV67RIpX8OrsWtq5hnJB3/7yIApgqYIXoUB8IGG2Lf1MkczZ1tggsgIWn4w4LeBm\nbJ1jWAwkMl7iY/OuJXAx0ikqR89aHDMAAqKbGsI4Gwjl+5nh0yfzb34wrwKBgGt8\nUbsLhjM96ssF3wevqiG0iXTI3wWWQNCygr5H0hdTBQj6PjpzdiwDXN94p7i67i06\nvpouCk6zMy+X7g2F3jSfgyzdzC2gFuC5sJfrZ+Yv28nbmxPxihaqyM9vy7NsVZg/\nRTSd3KajawGsD3VKUpR4SsiX0pu1THK4cAjROMKBAoGBANonWKFt5pxObYVmjEOO\nEVRPY+gc7/I5IIGOzLafxDoL020EGJtl9PcFn9qktDkPI4/ifPdHnDds37XHVS6A\n5rbx3Gc/v7XWVYDH/AvqInZ9Cr6yrskq0tnff6stmkNmZKpWrJl+wVvJRcNeFpex\naeKN+AX4uOx5HbeTisNSOzl0\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ewhf3@mp2-auth.iam.gserviceaccount.com",
  "client_id": "114507686885972856015",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs ",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ewhf3%40mp2-auth.iam.gserviceaccount.com"
}
)
firebase_admin.initialize_app(cred)

db=firestore.client()

# using now() to get current time
current_time = datetime.datetime.now()



def send_mail(url,email,price,name):
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login('malushreyash@gmail.com','znmjsgqardhdszjn')
    subject = "Price Fell Down! for " + name
    body = 'Your favourite product '+ name  + ' is now just at Rs '+ str(price) +  ' Check the Product link Here ' + url
    msg = f"Subject:{subject}\n\n{body}"
    server.sendmail(
        'malushreyash@gmail.com',
        email,
        msg
    )
    print("Hey Email has been sent")
    server.quit()


def algo(email,userId):
    current_time = datetime.datetime.now()
    todaysDate = current_time.year*10000 + current_time.month*100 + current_time.day
    product = db.collection('users').document(userId).collection('urlDataCollection').get()
    userProd=[]
    for p in product:
        userProd.append(p.id)
    for k in userProd:
        col = db.collection('users').document(userId).collection('urlDataCollection').document(k).get()
        currentInfo = col.to_dict()
        priceData = {
            '0': None,
            '1': None,
            '2': None,
            '3': None,
            '4': None,
            '5': None,
            '6': None,
            '7': None
        }
        lastDate = currentInfo["lastUpdatedDate"]
        Producturl = currentInfo["productUrl"]
        currentpriceData = currentInfo['prices']
        currentPriceSDatabase = currentInfo['currentPrice']
        trackres = {}
        try:
            if(currentInfo['type'] == 'amazon'):
                trackres = getAmazonPrice(Producturl)
            else:
                trackres = getFlipkartPrice(Producturl)
        except :
            return False
        else : 
            newPrice = trackres["price"]
            noList = ['0','1','2','3','4','5','6','7']
            limit = todaysDate - lastDate

            i = 0
            if(limit>0):
                while(i<(8-(limit))):
                    priceData[noList[i]] = currentpriceData[noList[i+limit]]
                    i = i+1
                priceData['7'] = newPrice

            elif(limit == 0):
                if(currentPriceSDatabase > newPrice):
                    priceData = currentpriceData
                    priceData['7'] = newPrice
                    print('Price Change')
                elif(currentPriceSDatabase < newPrice):
                    currentInfo['currentPrice'] = newPrice
                    print('Price Change')
                    db.collection('users').document(userId).collection('urlDataCollection').document(k).update(currentInfo)
                    continue
                else:
                    print('No Price Change')
                    continue

            currentInfo['prices'] = priceData
            currentInfo['currentPrice'] = newPrice
            currentInfo['lastUpdatedDate'] = todaysDate
            if (currentInfo['activeStatus'] == True):
                if (currentInfo['thresholdAlertStatus'] == True):
                    if (currentInfo['currentPrice'] < currentInfo['thresholdValue']):
                        send_mail(Producturl, email, newPrice, currentInfo['productName'])
                else:
                    send_mail(Producturl, email, newPrice, currentInfo['productName'])

            db.collection('users').document(userId).collection('urlDataCollection').document(k).update(currentInfo)
    return True


@app.route('/pricecheck', methods=["POST"])
@cross_origin(supports_credentials = True)
def price_check():
    websiteType = request.json['type']
    url = request.json['url']
    if(websiteType == "amazon"):
        res = getAmazonPrice(url)
    elif (websiteType == "flipkart"):
        res= getFlipkartPrice(url)
    response = jsonify(res)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/sendmail', methods=["POST"])
@cross_origin(supports_credentials = True)
def sendmail():
    email = request.json['email']
    websiteType = request.json['type']
    url = request.json['url']
    price = request.json['price']
    name = request.json['ProductTagName']
    send_mail(url,email,price,name)
    response = jsonify({"web":websiteType,"type":'aa',"u":url})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response



@app.route('/checkRoutineUpdate', methods=["POST"])
@cross_origin(supports_credentials = True)
def updateDatabase():
    email = request.json['email']
    userId = request.json['userId']
    res = algo(email,userId)
    if(res) :
        return jsonify({ 'msg' :'Updated Successfully '})
    return jsonify({ 'msg' :'Update Failed '})
    

if __name__ == "__main__":
    app.run(debug=True)