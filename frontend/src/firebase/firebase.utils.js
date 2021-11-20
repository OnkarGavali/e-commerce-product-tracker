import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyDGwdNT5V2s1Y8Wpfdv6tXcu33GTBplYz0",
  authDomain: "mp2-auth.firebaseapp.com",
  projectId: "mp2-auth",
  storageBucket: "mp2-auth.appspot.com",
  messagingSenderId: "723715926031",
  appId: "1:723715926031:web:2c178dc461aa22d796db7a",
  measurementId: "G-3GTVJGKRW8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth){
        return;
    }
    const userRef =  firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch( error){
            console.log('error creating user',error.message)
        }
        // console.log(await addUrlList(userAuth,{
        //     type:"amazon",
        //     productName:"Amazon Brand - Solimo Microfibre & Polyester 2-Piece Bed Pillow Set - 40 x 60 cm, White",
        //     url:"https://www.amazon.in/dp/B07G4K7B1G/ref=s9_acsd_hps_bw_c2_x_1_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-3&pf_rd_r=Z9KPZNK8J657A06Q9RKJ&pf_rd_t=101&pf_rd_p=945d1576-d29c-4a80-8a61-2d95793f25c0&pf_rd_i=16368877031",
        //     UserProductNickName:"Cusion",
        //     currentPrice:5150,
        //     prices:{
        //         0:null,
        //         1:5014,
        //         2:5014,
        //         3:null,
        //         4:5013,
        //         5:5014,
        //         6:5014,
        //         7:5000
        //     },
        //     thresholdValue:4999,
        //     imageUrl:"https://m.media-amazon.com/images/I/715XlyB-aXL._SX679_.jpg"

        // }))
    }
    //console.log(await urlList(userAuth,{type:"amezon",url:"url1"}))
    //await updateUrlList(userAuth,{type:"amezon",url:"url1",id:"ezXbpIFcmzGLtA3PIF3d"})
    //await deleteUrlList(userAuth,{type:"amezon",url:"url1",id:"ezXbpIFcmzGLtA3PIF3d"})

    return userRef;
}

export const addUrlList =  async (userAuth, urlData) =>{
    if(!userAuth){
        return;
    }
    const li = [];
    const userRef =  firestore.doc(`users/${userAuth.uid}`)
    const urlRef = firestore.collection(`users/${userAuth.uid}/urlDataCollection`)
    const updatedDate = new Date();
    const lastUpdate = updatedDate.getFullYear()*1000 + updatedDate.getMonth()*100 + updatedDate.getDate();
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
    const z = await urlRef.get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        li.push({id:doc.id, ...doc.data()})
      });
      return querySnapshot.docs;
    });
    //console.log(z);
    return li;
}


export const updateUrlList =  async (userAuth, urlData) =>{
    if(!userAuth){
        return;
    }
    const userRef =  firestore.doc(`users/${userAuth.uid}`)
    const urlRef = firestore.doc(`users/${userAuth.uid}/urlDataCollection/${urlData.id}`)
    const userSnapShot = await userRef.get()
    console.log(`users/${userAuth.uid}/collection/${urlData.id}`)
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
                    3:NaN,
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
    const urlRef = firestore.doc(`users/${userAuth.uid}/urlDataCollection/${urlData.id}`)
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



firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;



