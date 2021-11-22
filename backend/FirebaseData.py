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
    userProd = []
    finalres = []
    for u in userId:
        product = db.collection('users').document(u).collection('urlDataCollection').get()

        for p in product:
            userProd.append(p.id)
        for k in userProd:
            col = db.collection('users').document(u).collection('urlDataCollection').document(k).get()
            currentInfo = col.to_dict()
            print(currentInfo)
            purl = currentInfo["productUrl"]
            priceData = currentInfo['prices']
            if(currentInfo['type'] == 'amazon'):
                 trackres = getAmazonPrice(purl)
                 print('Amazon!!')
            else:
                trackres = getFlipkartPrice(purl)

            newPrice = trackres["price"]
            i = '0'

            priceData['1'] = priceData['2']
            priceData['2'] = priceData['3']
            priceData['3'] = priceData['4']
            priceData['4'] = priceData['5']
            priceData['5'] = priceData['6']
            print(priceData['7'])
            priceData['6'] = priceData['7']
            priceData['7'] = newPrice
            newPrice = 490
            if(newPrice < priceData['7']):
                mailid = getEmail(u)
                print('Send Email to ' + mailid)
                print(currentInfo['productName'])
                send_mail(purl,mailid,newPrice,currentInfo['productName'])


            db.collection('users').document(u).collection('urlDataCollection').document(k).update(
                {'prices' : priceData })
            db.collection('users').document(u).collection('urlDataCollection').document(k).update(
                {'currentPrice': newPrice})
            db.collection('users').document(u).collection('urlDataCollection').document(k).update(
                {'lastUpdatedDate': todaysDate})
            col = db.collection('users').document(u).collection('urlDataCollection').document(k).get()
            print(col.to_dict())

















i=1

def getEmail(id):
    result = db.collection('users').get()
    for res in result:
        if(res.id == id):
            dt = res.to_dict()

    return dt['email']



def kfunction():
    userId = []
    price = []
    result = db.collection('users').get()
    for res in result:
        userId.append(res.id)
        #print(res.id)
    userProd = []
    finalres = []

    for u in userId:
        product = db.collection('users').document(u).collection('urlDataCollection').get()

        for p in product:
            userProd.append(p.id)
        for k in userProd:
            col = db.collection('users').document(u).collection('urlDataCollection').document(k).get()
            finalres.append(col.to_dict())
            purl = finalres[0]['productUrl']
            trackres = getAmazonPrice(purl)
            price = finalres[0]['prices']['1']
            email = getEmail(u)
            if(trackres['Price'] < price[-1]):
                print('Send Email to ' + email)

            price.append(trackres['Price'])
            #pdetail = col.to_dict()
            print('Send Email to ' + email)
            print(pdetail)
            z=1
            s = str(z)
            db.collection('users').document(u).collection('urlDataCollection').document(k).update({'prices.'+s : price})
            col = db.collection('users').document(u).collection('urlDataCollection').document(k).get()
            print(col.to_dict())



algo()





#product  = db.collection('users').document(userId[1]).collection('urlDataCollection').get()


#db.collection('users').document(userId[1]).collection('urlDataCollection').document('AnEoifvLUD88wWzopkUy').update({ 'prices' : {'1': 200, '5': 4500, '7': 5000, '2': 5000, '3': 4000, '6': 5000, '4': 5000}})

#col = db.collection('users').document(userId[1]).collection('urlDataCollection').document('AnEoifvLUD88wWzopkUy').get()
#print(col.to_dict())









