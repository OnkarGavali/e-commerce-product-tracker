import { firestore } from "firebase/firebase.utils";
import { priceCheck, sendMail } from "./PriceCheckAPI";

export const addUrlList =  async (userAuth, urlData) => {
    if(!userAuth){
        return;
    }
    const li = [];
    const userRef =  firestore.doc(`users/${userAuth.id}`)
    const urlRef = firestore.collection(`users/${userAuth.uid}/urlDataCollection`)
    const updatedDate = new Date();
    const lastUpdate = updatedDate.getFullYear()*10000 + updatedDate.getMonth()*100 + updatedDate.getDate();
    const userSnapShot = await userRef.get()
    //console.log(urlRef);
    if(userSnapShot.exists){
        try{
            await urlRef.add({
                productName:urlData.productName,
                type:urlData.type,
                UserProductNickName:urlData.UserProductNickName,
                productUrl:urlData.url,
                imageUrl:urlData.imageUrl,
                currentPrice:urlData.currentPrice,
                prices:urlData.prices,
                activeStatus:true,
                thresholdValue:urlData.thresholdValue,
                thresholdAlertStatus:true,
                lastUpdatedDate: lastUpdate
            })
        } catch( error ){
            console.log('error creating user',error.message)
        }
    }
}

export const getUrlList =  async (userAuth ) =>{
    if(!userAuth){
        return;
    }
    const li = [];
    const urlRef = firestore.collection(`users/${userAuth.id}/urlDataCollection`)
    const urlSnapshot = await urlRef.get()
    console.log(urlSnapshot)
    if(urlSnapshot.size){
        try{
            await urlRef.get()
            .then(querySnapshot => {
                querySnapshot.docs.map(doc => {
                //priceCheck({...doc.data()})
                li.push({id:doc.id, ...doc.data()})
                //sendMail({userEmail: userAuth.email, ...doc.data()})
                });
            });
        } catch( error ){
            console.log('error creating user',error.message)
        }
    }
    //console.log(li)
    return li;
}



export const updateUrlList =  async (userAuth, urlData) =>{
    if(!userAuth){
        return;
    }
    const urlRef = firestore.doc(`users/${userAuth.uid}/urlDataCollection/${urlData.id}`)
    console.log(`users/${userAuth.id}/urlDataCollection/${urlData.id}`)
    const urlSnapshot = await urlRef.get()
    if(urlSnapshot.exists){
        console.log("hi")
        console.log((urlSnapshot))
        console.log((urlSnapshot.data()))
        try{
            await urlRef.update({
                productName:"aaaaaa",
                UserProductTagName:"tagName",
                type:urlData.type,
                productUrl:urlData.url,
                imageUrl:"aaaaaaaaaaaaaaaaazzzz",
                currentPrice:urlData.url,
                prices:{
                    0:5014,
                    1:5014,
                    2:5014,
                    3:null,
                    4:5013,
                    5:5014,
                    6:5014,
                    7:4999
                },
                activeStatus:true,
                thresholdValue:99999,
                thresholdAlertStatus:false,
                lastUpdatedDate: urlData.lastUpdate
            })
        } catch( error){
            console.log('error creating user',error.message)
        }
    }
    else {
        console.log("Invalid id");
    }
    console.log("end upadte")
}

export const deleteUrlList =  async (userAuth, urlData) =>{
    if(!userAuth){
        return;
    }
    const urlRef = firestore.doc(`users/${userAuth.id}/urlDataCollection/${urlData.id}`)
    const urlSnapshot = await urlRef.get()
    if(urlSnapshot.exists){
        console.log("hi")
        console.log((urlSnapshot))
        console.log((urlSnapshot.data()))
        try{
            await urlRef.delete()
        } catch( error){
            console.log('error creating user',error.message)
        }
    }
    else {
        console.log("Invalid id");
    }
}
