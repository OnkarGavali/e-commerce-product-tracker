import { firestore } from "firebase/firebase.utils";
import { ActionOnPriceChange } from "./DataCooking.utils";
import { priceCheck, sendMail } from "./PriceCheckAPI";

export const addUrlList =  async (userAuth, urlData) => {
    if(!userAuth){
        return;
    }
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
                ProductTagName:urlData.ProductTagName,
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
    let li = [];
    const urlRef = firestore.collection(`users/${userAuth.id}/urlDataCollection`)
    const urlSnapshot = await urlRef.get()
    //console.log(urlSnapshot)
    if(urlSnapshot.size){
        try{
                urlSnapshot.docs.map(  doc => {
                const data = ActionOnPriceChange({id:doc.id, ...doc.data()})
                if(data != null){
                    if(doc.data().activeStatus){
                        if(doc.data().thresholdAlertStatus)
                        {
                            if(data.currentPrice < doc.data().thresholdValue){
                                sendMail({userEmail:userAuth.email,...data})
                            }
                        } else if(data.currentPrice == data.prices[7] ) {
                            sendMail({userEmail:userAuth.email,...data})
                        }
                    }
                    updateUrlList(userAuth,data)
                    li.push(data)
                } else {
                    li.push({id:doc.id, ...doc.data()})
                }
            });
        } catch( error ){
            console.log('error creating user',error.message)
        }
    }
    console.log(li)
    return li;
}

export const updateUrlList =  async (userAuth, urlData) =>{
    if(!userAuth){
        return;
    }
    const urlRef = firestore.doc(`users/${userAuth.id}/urlDataCollection/${urlData.id}`)
    const urlSnapshot = await urlRef.get()
    if(urlSnapshot.exists){
        console.log((urlSnapshot.data()))
        try{
            await urlRef.update({
                productName:urlData.productName,
                ProductTagName:urlData.ProductTagName,
                type:urlData.type,
                productUrl:urlData.productUrl,
                imageUrl:urlData.imageUrl,
                currentPrice:urlData.currentPrice,
                prices: urlData.prices,
                activeStatus:urlData.activeStatus,
                thresholdValue:urlData.thresholdValue,
                thresholdAlertStatus:urlData.thresholdAlertStatus,
                lastUpdatedDate: urlData.lastUpdatedDate
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
