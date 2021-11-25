import { firestore } from "firebase/firebase.utils";
import { ActionOnPriceChange } from "./DataCooking.utils";
import { priceCheck, sendMail } from "./PriceCheckAPI";

export const addUrlList =  async (userAuth, urlData) => {
    if(!userAuth){
        return;
    }
    const userRef =  firestore.doc(`users/${userAuth.uid}`)
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
                productUrl:urlData.productUrl,
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
    return "done adding"
}

// export const getUrlList =  async (userAuth ) =>{
//     if(!userAuth){
//         return;
//     }
//     let li = [];
//     const urlRef = firestore.collection(`users/${userAuth.id}/urlDataCollection`)
//     const urlSnapshot = await urlRef.get()
//     //console.log(urlSnapshot)
//     if(urlSnapshot.size){
//         try{
//             const urlSnapshot = await urlRef.get()
//             urlSnapshot.docs.map( doc => {
//                 const data = ActionOnPriceChange({id:doc.id, ...doc.data()})
//                     .then((data)=> {
//                         console.log("single data in getUrl",data)
//                         if(data != null){
//                             if(doc.data().activeStatus){
//                                 if(doc.data().thresholdAlertStatus)
//                                 {
//                                     if(data.currentPrice < doc.data().thresholdValue){
//                                         sendMail({userEmail:userAuth.email,...data})
//                                     }
//                                 } else if(data.currentPrice < doc.data().currentPrice ) {
//                                     sendMail({userEmail:userAuth.email,...data})
//                                 } else if(data.lastUpdatedDate !== doc.data().lastUpdatedDate && (data.currentPrice<doc.data().currentPrice))
//                                 {
//                                     sendMail({userEmail:userAuth.email,...data})
//                                 }
//                             }
//                             updateUrlList(userAuth,data)
//                             //li = [...li, data]
//                             li  = li.push(data)
//                         } else {
//                             li.push({id:doc.id, ...doc.data()})
//                             //li = [...li, {id:doc.id, ...doc.data()}]
//                         }
//                     })
//                     console.log("final data in getUrl list after then",li,li.length)      
//                     //return li;
               
//             });
//         } catch( error ){
//             console.log('error creating user',error.message)
//             return li;
//         }
//     }
//     console.log("final data in getUrl list last line",li,li.length)    
//     return li;
// }

// export const getUrlList =  async (userAuth ) =>{
//     if(!userAuth){
//         return;
//     }
//     let li = [];
//     const urlRef = firestore.collection(`users/${userAuth.id}/urlDataCollection`)
//     const urlSnapshot = await urlRef.get()
//     //console.log(urlSnapshot)
//     let lastindex = 0
//     let i=1
//     if(urlSnapshot.size){
//         try{
//             const urlSnapshot = await urlRef.get()
//             console.log(urlSnapshot,urlSnapshot.docs.length)
//             lastindex = urlSnapshot.docs.length
//             i=1
//             const d = await urlSnapshot.docs.map(  async doc => {
//                 const firebaseData = doc.data()
                
//                 const data = await ActionOnPriceChange({id:doc.id, ...firebaseData})
                   
//                         console.log("single data in getUrl",data)
//                         if(data != null){
//                             if(firebaseData.activeStatus){
//                                 if(firebaseData.thresholdAlertStatus)
//                                 {
//                                     if(data.currentPrice < firebaseData.thresholdValue){
//                                         sendMail({userEmail:userAuth.email,...data})
//                                     }
//                                 } else if(data.currentPrice < firebaseData.currentPrice ) {
//                                     sendMail({userEmail:userAuth.email,...data})
//                                 } else if(data.lastUpdatedDate !== firebaseData.lastUpdatedDate && (data.currentPrice<firebaseData.currentPrice))
//                                 {
//                                     sendMail({userEmail:userAuth.email,...data})
//                                 }
//                             }
//                              updateUrlList(userAuth,data)
//                             //li = [...li, data]
//                             li  = li.push(data)
//                         } else {
//                             li.push({id:doc.id, ...firebaseData})
//                             //li = [...li, {id:doc.id, ...doc.data()}]
//                         }
                   
//                     console.log("final data in getUrl list after then",li,li.length)      
//                     //return li;
//                     if(i==lastindex){
//                         console.log("ji")
//                         return li
//                     }
//                     i++;
               
//             });
//         } catch( error ){
//             console.log('error creating user',error.message)
//             return li;
//         }
//     }
//     console.log("final data in getUrl list last line",li,li.length)
//     // while(i!=lastindex)
//     // {
//     //     console.log("jiii")
//     // }
//     const z= li    
//     return z;
// }


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
            const urlSnapshot = await urlRef.get()
            console.log(urlSnapshot,urlSnapshot.docs.length)
    
            const d = await urlSnapshot.docs.map(  async doc => {
                const firebaseData = doc.data()
                li.push({id:doc.id, ...firebaseData})
            });
        } catch( error ){
            console.log('error creating user',error.message)
            return li;
        }
    }
    console.log("final data in getUrl list last line",li,li.length) 
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


export const abc = () => {

}