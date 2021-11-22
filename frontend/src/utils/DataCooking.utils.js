import { priceCheck, sendMail } from "./PriceCheckAPI";
export const rankProductList = (ProductList) => {
    const rankedList = []
    ProductList.map(prod =>{
        if(prod.prices[6]!=null)
        {
            const priceChangeRate = 100 * (prod.prices[6] - prod.prices[7])/prod.prices[6]
            rankedList.push({...prod,profit:priceChangeRate})
        } else {
            rankedList.push({...prod,profit:-1000})
        }
    } )
    rankedList.sort((a,b)=> {return a.profit - b.profit})
    return rankedList;
}


export const ActionOnPriceChange  = (ProductList) => {

    const dataData = new Date();
    const todaysDate = dataData.getFullYear()*10000 + dataData.getMonth()*100 + dataData.getDate();
    ProductList.map()
}