

export const priceCheck = async (ProductData)=>  {
    const dataToSend = { 
        type:ProductData.type,
        url:ProductData.productUrl
    }
    //console.log(dataToSend)
    let tmp = {}
    await fetch('/pricecheck', {
            'method' : "POST",
            headers: {
                "Content-Type" : 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(async resp => {tmp = await resp.json()})
        .catch(e=>console.log("e",e))
    
    // const finalData = {
    //     price:data.price,
    //     ImageUrl : data.image,
    //     productName: data.name
    // }
    // console.log(data,typeof(data.price),finalData)
    //console.log(tmp)
    return tmp;
}

export const sendMail = async (ProductData) => {
    const dataToSend = { 
        type:ProductData.type,
        url:ProductData.productUrl,
        price: ProductData.currentPrice,
        email: ProductData.userEmail
    }
    //console.log(dataToSend)
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
    //console.log(data)
}