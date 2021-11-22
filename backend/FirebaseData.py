import firebase_admin
from firebase_admin import credentials
from firebase_admin import  firestore

from AmazonPriceTrack import  getAmazonPrice
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db=firestore.client()




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





kfunction()



#product  = db.collection('users').document(userId[1]).collection('urlDataCollection').get()


#db.collection('users').document(userId[1]).collection('urlDataCollection').document('AnEoifvLUD88wWzopkUy').update({ 'prices' : {'1': 200, '5': 4500, '7': 5000, '2': 5000, '3': 4000, '6': 5000, '4': 5000}})

#col = db.collection('users').document(userId[1]).collection('urlDataCollection').document('AnEoifvLUD88wWzopkUy').get()
#print(col.to_dict())









