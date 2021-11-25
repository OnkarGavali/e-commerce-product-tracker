import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { ActionOnPriceChange } from 'utils/DataCooking.utils';
import { addUrlList } from 'utils/firebaseUserData.utils';

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
    }
    //console.log(await urlList(userAuth,{type:"amezon",url:"url1"}))
    //await updateUrlList(userAuth,{type:"amezon",url:"url1",id:"ezXbpIFcmzGLtA3PIF3d"})
    //await deleteUrlList(userAuth,{type:"amezon",url:"url1",id:"ezXbpIFcmzGLtA3PIF3d"})
    //  console.log(await addUrlList(userAuth,{
    //         type:"amazon",
    //         productName:"Amazon Brand - Solimo Microfibre & Polyester 2-Piece Bed Pillow Set - 40 x 60 cm, White",
    //         url:"https://www.amazon.in/dp/B07G4K7B1G/ref=s9_acsd_hps_bw_c2_x_1_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-3&pf_rd_r=Z9KPZNK8J657A06Q9RKJ&pf_rd_t=101&pf_rd_p=945d1576-d29c-4a80-8a61-2d95793f25c0&pf_rd_i=16368877031",
    //         UserProductNickName:"Cusion",
    //         currentPrice:5150,
    //         prices:{
    //             0:null,
    //             1:5014,
    //             2:5014,
    //             3:null,
    //             4:5013,
    //             5:5014,
    //             6:5014,
    //             7:5150
    //         },
    //         thresholdValue:4999,
    //         imageUrl:"https://m.media-amazon.com/images/I/715XlyB-aXL._SX679_.jpg"

    //     }))

    //console.log(await urlList(userAuth,{type:"flikart",url:"url1"}))
    //await updateUrlList(userAuth,{type:"amezon",url:"url1",id:"ezXbpIFcmzGLtA3PIF3d"})
    //await deleteUrlList(userAuth,{type:"amezon",url:"url1",id:"ezXbpIFcmzGLtA3PIF3d"})
    //  console.log(await addUrlList(userAuth,{
    //         type:"flipkart",
    //         productName:"Slides  (Black 9)",
    //         productUrl:"https://www.amazon.in/dp/B07G4K7B1G/ref=s9_acsd_hps_bw_c2_x_1_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-3&pf_rd_r=Z9KPZNK8J657A06Q9RKJ&pf_rd_t=101&pf_rd_p=945d1576-d29c-4a80-8a61-2d95793f25c0&pf_rd_i=16368877031",
    //         ProductTagName:"My brother Slide Slider",
    //         currentPrice:2095,
    //         prices:{
    //             0:2095,
    //             1:2095,
    //             2:2015,
    //             3:2090,
    //             4:null,
    //             5:2099,
    //             6:2085,
    //             7:2095
    //         },
    //         thresholdValue:null,
    //         imageUrl:"https://rukminim1.flixcart.com/image/714/857/klv7ekw0/slipper-flip-flop/i/k/t/11-cn9675-006nike-nike-black-metallic-gold-black-original-imagyw9ydquxjm8k.jpeg?q=50"

    //     }))
    
    // console.log(await addUrlList(userAuth,{
    //         type:"flipkart",
    //         productName:"Slides  (Black 9)",
    //         productUrl:"https://www.amazon.in/dp/B07G4K7B1G/ref=s9_acsd_hps_bw_c2_x_1_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-3&pf_rd_r=Z9KPZNK8J657A06Q9RKJ&pf_rd_t=101&pf_rd_p=945d1576-d29c-4a80-8a61-2d95793f25c0&pf_rd_i=16368877031",
    //         ProductTagName:"My brother Slide Slider",
    //         currentPrice:2095,
    //         prices:{
    //             0:2095,
    //             1:2095,
    //             2:2015,
    //             3:2090,
    //             4:null,
    //             5:2099,
    //             6:2085,
    //             7:2095
    //         },
    //         thresholdValue:null,
    //         imageUrl:"https://rukminim1.flixcart.com/image/714/857/klv7ekw0/slipper-flip-flop/i/k/t/11-cn9675-006nike-nike-black-metallic-gold-black-original-imagyw9ydquxjm8k.jpeg?q=50"

    //     }))



    //getUrlList(userAuth)
    //ActionOnPriceChange()
    return userRef;
    
}




firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;



