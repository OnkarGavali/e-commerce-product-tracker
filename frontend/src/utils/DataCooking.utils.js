import { priceCheck, sendMail } from "./PriceCheckAPI";
export const rankProductList = (ProductList) => {
    let rankedList = []
    console.log(ProductList)
    if(ProductList.length){
        console.log("hi we are in rankedlist 1st loop")
        ProductList.map(prod =>{
             console.log("hi we are in rankedlist 1st loop")
            console.log("rankedlist prices[6]",prod.prices[6])
            if(prod && (prod.prices[6]!=null))
            {
                const priceChangeRate = 100 * (prod.prices[6] - prod.prices[7])/prod.prices[6]
                rankedList.push({...prod,profit:priceChangeRate})
            } else {
                rankedList.push({...prod,profit:-1000})
            }
        } )
        rankedList.sort((a,b)=> {return a.profit - b.profit})
    }
    
    return rankedList;
}

export const ActionOnPriceChange  = async (product) => {

    const dataData = new Date();
    const todaysDate = dataData.getFullYear()*10000 + dataData.getMonth()*100 + dataData.getDate();
    const newData = product
    //console.log(product)
    let priceData = {
        0:null,
        1:null,
        2:null,
        3:null,
        4:null,
        5:null,
        6:null,
        7:null
    }
   
    let i=0,limit=todaysDate-product.lastUpdatedDate;
    let currentdata = await priceCheck(product);
    console.log("currentdata",currentdata)
    if(!currentdata){
        return null
    }
    if(todaysDate-product.lastUpdatedDate>31)
    {
        limit=10
    }
    if(limit>0){
        for(;i<(8-(limit));i++)
        {
            priceData[i] = product.prices[i+limit]
            priceData[7] = currentdata.price;
        }
    } else if(limit == 0) {
        if(product.currentPrice > currentdata.price )
        {
            priceData= product.prices
            priceData[7] = currentdata.price;
        }else if(product.currentPrice < currentdata.price) {
            newData.currentPrice = currentdata.price
            return newData
        }else{
            console.log("sending null")
            return null
        }
    }
    newData.prices = priceData
    newData.currentPrice = currentdata.price
    newData.lastUpdatedDate = todaysDate
    return newData;
}
export const AddNew = async({ProductTagName,productUrl,type,thresholdValue=0}) => {
    const result = await priceCheck({"type":type,"productUrl":productUrl})
    if(!result){
        return false
    }
    const finalData = {
        productName:result.name,
        type:type,
        ProductTagName:ProductTagName,
        productUrl:productUrl,
        imageUrl:result.image,
        currentPrice:result.price,
        prices:{
            0:null,
            1:null,
            2:null,
            3:null,
            4:null,
            5:null,
            6:null,
            7:result.price
        },
        thresholdValue:thresholdValue,
    }
    console.log(finalData)
    return finalData;
}


export const UpdateEdited = async(data) => {
    const result = await priceCheck({"type":data.type,"productUrl":data.productUrl})
    if(!result){
        return false
    }
    const finalData = {
        id:data.id,
        productName:result.name,
        type:data.type,
        ProductTagName:data.ProductTagName,
        productUrl:data.productUrl,
        imageUrl:result.image,
        currentPrice:result.price,
        prices:{
            0:data.prices[0],
            1:data.prices[1],
            2:data.prices[2],
            3:data.prices[3],
            4:data.prices[4],
            5:data.prices[5],
            6:data.prices[6],
            7:result.price
        },
        thresholdValue:data.thresholdValue,
        activeStatus:data.activeStatus,
        thresholdAlertStatus:data.thresholdAlertStatus,
        lastUpdatedDate: data.lastUpdatedDate
    }
    console.log(finalData)
    return finalData;
}

export const checkHeader = (productList) =>{
    let activeProduct = 0
    let totalThresholdActiveProducts = 0
    let productWhosPriceIsLessThanYesterday = 0 
    productList.map((product) => {
        if(product.activeStatus){
            activeProduct=activeProduct+1
            if(product.prices[6] && product.currentPrice && product.prices[6] > product.currentPrice){
                productWhosPriceIsLessThanYesterday=totalThresholdActiveProducts+1
            }
            if(product.thresholdAlertStatus){
                if(product.currentPrice<product.thresholdValue){
                    totalThresholdActiveProducts=totalThresholdActiveProducts+1
                }
            }
        }
    })
    const finalData = {
        activeProduct:activeProduct,
        totalThresholdActiveProducts:totalThresholdActiveProducts,
        productWhosPriceIsLessThanYesterday:productWhosPriceIsLessThanYesterday
    }
    return finalData;
}