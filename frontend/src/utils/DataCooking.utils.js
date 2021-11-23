import { priceCheck, sendMail } from "./PriceCheckAPI";
export const rankProductList = (ProductList) => {
    const rankedList = []
    ProductList.map(prod =>{
        if(prod.prices[6]!=null)
        {
            const priceChangeRate = 100 * (prod.prices[6] - prod.prices[7])/prod.prices[6]
            rankedList.push({...prod,profit:priceChangeRate})
        } else {
            rankedList.push({...prod,profit:null})
        }
    } )
    rankedList.sort((a,b)=> {return a.profit - b.profit})
    return rankedList;
}


export const ActionOnPriceChange  =  (product) => {

    const dataData = new Date();
    const todaysDate = dataData.getFullYear()*10000 + dataData.getMonth()*100 + dataData.getDate();
    const newData = product
    const li = []
    //console.log(product)
    const priceData = {
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
    const currentdata = priceCheck(product);
    if(todaysDate-product.lastUpdatedDate>31)
    {
        limit=10
    }
    if(limit>0){
        for(;i<(8-(limit));i++)
        {
            priceData[i] = product.prices[i+limit] 
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
            return null
        }
    }
    newData.prices = priceData
    newData.currentPrice = currentdata.price
    newData.lastUpdatedDate = todaysDate
    return newData
}