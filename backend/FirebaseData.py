import time

import firebase_admin
import smtplib
from FlipkartPriceTrack import  getFlipkartPrice
from firebase_admin import credentials
from firebase_admin import  firestore
from AmazonPriceTrack import  getAmazonPrice

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
import datetime

# using now() to get current time
current_time = datetime.datetime.now()
db=firestore.client()




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


def algo():
    todaysDate = current_time.year*10000 + current_time.month*100 + current_time.day
    userId = []
    price = []
    result = db.collection('users').get()


    for res in result:
        userId.append(res.id)
        # print(res.id)

    for u in userId:
        userProd = []
        product = db.collection('users').document(u).collection('urlDataCollection').get()

        for p in product:
            userProd.append(p.id)
        for k in userProd:
            col = db.collection('users').document(u).collection('urlDataCollection').document(k).get()

            currentInfo = col.to_dict()
            print(currentInfo)
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
            purl = currentInfo["productUrl"]
            currentpriceData = currentInfo['prices']
            currentPriceSDatabase = currentInfo['currentPrice']
            if(currentInfo['type'] == 'amazon'):
                 trackres = getAmazonPrice(purl)
                 print('Amazon!!')
            else:
                trackres = getFlipkartPrice(purl)

            newPrice = trackres["price"]
            noList = ['0','1','2','3','4','5','6','7']
            limit = todaysDate - lastDate

            i = 0

            if(limit>0):
                while(i<(8-(limit))):
                    priceData[noList[i]] = currentpriceData[noList[i+limit]]
                    i = i+1
            elif(limit == 0):
                if(currentPriceSDatabase > newPrice):
                    priceData = currentpriceData
                    priceData['7'] = newPrice
                elif(currentPriceSDatabase < newPrice):
                    currentInfo['currentPrice'] = newPrice

                    db.collection('users').document(u).collection('urlDataCollection').document(k).update(currentInfo)
                    continue
                else:
                    continue


            currentInfo['prices'] = priceData
            currentInfo['currentPrice'] = newPrice
            currentInfo['lastUpdatedDate'] = todaysDate
            if (currentInfo['activeStatus'] == True):
                if (currentInfo['thresholdAlertStatus'] == True):
                    if (currentInfo['currentPrice'] < currentInfo['thresholdValue']):
                        mailid = getEmail(u)
                        send_mail(purl, mailid, newPrice, currentInfo['productName'])

                else:
                    mailid = getEmail(u)
                    send_mail(purl, mailid, newPrice, currentInfo['productName'])

            db.collection('users').document(u).collection('urlDataCollection').document(k).update(currentInfo)
            col = db.collection('users').document(u).collection('urlDataCollection').document(k).get()
            print('New Result After Update')
            print(col.to_dict())


def getEmail(id):
    result = db.collection('users').get()
    for res in result:
        if(res.id == id):
            dt = res.to_dict()

    return dt['email']


while(1):
    algo()
    time.sleep(10800)













