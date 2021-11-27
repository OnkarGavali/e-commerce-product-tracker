import React, { useEffect, useState } from 'react'
import ReactLoading from "react-loading";
import { connect } from 'react-redux';
import { updateCurrentProductList } from 'redux/userProductCollection/userProductCollectionActions';
import { setCurrentProductList } from 'redux/userProductCollection/userProductCollectionActions';
import { UpdateEdited } from 'utils/DataCooking.utils';
import { AddNew } from 'utils/DataCooking.utils';
import { updateUrlList } from 'utils/firebaseUserData.utils';
import { addUrlList } from 'utils/firebaseUserData.utils';
import { createNewProduct, setEditProductData } from '../../redux/editProduct/editProductActions'
const UrlInputBox = ({editFormRef,editProductData,setEditProductData,currentUser,setCurrentProductList,updateCurrentProductList}) => {

    const [insertedUrl, setInsertedUrl] = useState("")
    const [tagName, setTagName] = useState("")
    const [thresholdValue, setThresholdValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if(editProductData){
            setInsertedUrl(editProductData.productUrl)
            setTagName(editProductData.ProductTagName)
            if(editProductData.thresholdValue){
                setThresholdValue(editProductData.thresholdValue)
            } else {
                setThresholdValue("")
            }
        }
    }, [editProductData])
    
    const handleAddNewSubmit = async() => {
        setIsLoading(true)
        let type,resData;
        if(insertedUrl.indexOf( "https://www.amazon.in/") !== -1 ) {
            type = "amazon"
        } else if( insertedUrl.indexOf( "https://www.flipkart.com/") !== -1 ) {
            type = "flipkart"
        } else {
            alert("Invalid URL")
            return
        }
        //console.log(thresholdValue,Number(thresholdValue),tagName,insertedUrl,thresholdValue.length)
        if(thresholdValue.length){
            const number = Number(thresholdValue)
            console.log("jj",{ProductTagName:tagName,productUrl: insertedUrl,type:type,thresholdValue:number})
            resData = await AddNew({ProductTagName:tagName,productUrl: insertedUrl,type:type,thresholdValue:number})
        } else {
            resData = await AddNew({ProductTagName:tagName,productUrl: insertedUrl,type:type})
        }
        if(resData){
            const finalCheck  = await addUrlList(currentUser,resData)
            if(finalCheck){
                alert("Product Added successfully")
                setCurrentProductList([])
            }else{
                alert("Product not added check url")
            }
        } else {
            alert("Product not added check url")
        }
        setInsertedUrl("")
        setTagName("")
        setThresholdValue("")
        setIsLoading(false)
    }

    const handleShiftToCreateNew = () =>{
        setIsLoading(true)
        setEditProductData()
        setInsertedUrl("")
        setTagName("")
        setThresholdValue("")
        setIsLoading(false)
    }
    const handleUpdateSubmit = async() => {
        setIsLoading(true)
        let type,resData, newEditedData;
        if(insertedUrl.indexOf( "https://www.amazon.in/") !== -1 ) {
            type = "amazon"
        } else if( insertedUrl.indexOf( "https://www.flipkart.com/") !== -1 ) {
            type = "flipkart"
        } else {
            alert("Invalid URL")
            return
        }
        //console.log(thresholdValue,Number(thresholdValue),tagName,insertedUrl,thresholdValue.length)
        if(thresholdValue.length){
            const number = Number(thresholdValue)
            newEditedData = {...editProductData,ProductTagName:tagName,productUrl: insertedUrl,type:type,thresholdValue:number}
            resData = await UpdateEdited(newEditedData)
        } else {
            newEditedData = {...editProductData,ProductTagName:tagName,productUrl: insertedUrl,type:type,thresholdValue:0}
            resData = await UpdateEdited(newEditedData)
        }
        if(resData){
            const finalCheck  = await updateUrlList(currentUser,resData)
            if(finalCheck){
                alert("Product updated successfully")
                updateCurrentProductList(resData)
            }else{
                alert("Product not updated check url")
            }
        } else {
            alert("Product not updated check url")
        }
        setInsertedUrl("")
        setTagName("")
        setThresholdValue("")
        setIsLoading(false)
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Want to get a Notification of the Product?</h6>
                        {
                            editProductData ? (
                                <>
                                    <button
                                        className="disabled:bg-lightBlue-100 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={()=>handleShiftToCreateNew()}
                                    >
                                    Add New Product Link
                                    </button>
                                    {
                                        insertedUrl.length > 0 && tagName.length > 0 ? (
                                            <button
                                                className="disabled:bg-lightBlue-100 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={()=>handleUpdateSubmit()}
                                            >
                                            Update Product
                                            </button>
                                        ) : (
                                             <button
                                                className="disabled:bg-lightBlue-100 bg-lightBlue-300 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={()=>handleUpdateSubmit()}
                                                disabled
                                            >
                                            Update Product
                                            </button>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        insertedUrl.length > 0 && tagName.length > 0 ? (
                                            <button
                                                className="disabled:bg-lightBlue-100 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={()=>handleAddNewSubmit()}
                                            >
                                            ADD Product
                                            </button>
                                        ) : (
                                            <button
                                                className="disabled:bg-lightBlue-100 bg-lightBlue-300 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={()=>handleAddNewSubmit()}
                                                disabled
                                            >
                                            ADD Product
                                            </button>
                                        )
                                    }
                                </>
                            )
                        }
                            
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {
                        isLoading ? (
                            <ReactLoading type={"bars"} color="#fff" />
                        ) : (
                            <form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Add Product link
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Give Me The Special nick Name <small>(like dad's birthday gift)</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Lucky"
                                            ref={editFormRef}
                                            value={tagName}
                                            onChange={e => setTagName(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Fill me with URL<small> ( Make sure you are inserting correct URL)</small>
                                        </label>
                                        <textarea
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Insert URL"
                                            rows="4"
                                            value={insertedUrl}
                                            onChange={e => setInsertedUrl(e.target.value)}
                                        ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                htmlFor="grid-password"
                                            >
                                                Is there any Perticular Price value below that you want to get Notified? <small>(optional and initialy service is off)</small>
                                            </label>
                                            <input
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Leave it empty if you dont want..."
                                                value={thresholdValue}
                                                onChange={e => setThresholdValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )
                    }
                </div>
            </div>
        </>
    )
}


const mapStateToProps = state => ({
  editProductData : state.editProductData.editProductData,
  currentUser : state.user.currentUser
})


const mapDispatchToProps = dispatch => ({
    createNewProduct : () => dispatch(createNewProduct()),
    setEditProductData : () => dispatch(setEditProductData()),
    setCurrentProductList : (productlist) => dispatch(setCurrentProductList(productlist)),
    updateCurrentProductList : (product) =>dispatch(updateCurrentProductList(product))
})

export  default connect(mapStateToProps, mapDispatchToProps)(UrlInputBox);