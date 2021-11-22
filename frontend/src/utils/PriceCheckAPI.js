import axios from 'axios'

export const priceCheck = async (ProductData)=>  {
    const dataToSend = { 
        type:ProductData.type,
        url:ProductData.productUrl
    }
    //console.log(dataToSend)
    const data = await fetch('/pricecheck', {
            'method' : "POST",
            headers: {
                "Content-Type" : 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(resp => {return  resp.json()})
        .catch(e=>console.log("e",e))
    //console.log(data)
    return data;
}

export const sendMail = async (ProductData) => {
    const dataToSend = { 
        type:ProductData.type,
        url:ProductData.productUrl,
        price: ProductData.currentPrice,
        email: ProductData.userEmail
    }
    console.log(dataToSend)
    const data = await fetch('/sendmail', {
            'method' : "POST",
            headers: {
                "Content-Type" : 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(resp => {return  resp.json()})
        .catch(e=>console.log("e",e))
        console.log(data)
}