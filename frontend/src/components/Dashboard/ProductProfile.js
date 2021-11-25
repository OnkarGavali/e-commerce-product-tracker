import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";

import { ProductProfileDropdown } from "components/Dropdowns/ProdcutProfileDropdown";
import { connect } from "react-redux";
import { setEditProductData } from "redux/editProduct/editProductActions";
import { deleteUrlList } from "utils/firebaseUserData.utils";
import { removeCurrentProduct } from "redux/currentProduct/currentProductActions";
import { setCurrentProduct } from "../../redux/currentProduct/currentProductActions";
import { updateUrlList } from "utils/firebaseUserData.utils";
import { updateCurrentProductList } from "redux/userProductCollection/userProductCollectionActions";
import { deleteFromCurrentProductList } from "redux/userProductCollection/userProductCollectionActions";

// components
function ProductProfile({currentUser,setEditFormRef, currentProduct,removeCurrentProduct,updateCurrentProductList,deleteFromCurrentProductList,setEditProductData,}) {
  

  const [productActiveStatus, setProductActiveStatus] = useState(true)
  const [thresholdStatus, setThresholdStatus] = useState(false)
  const [isChanged, setIsChanged] = useState(false)
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const openTooltip = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "top"
    });
    setPopoverShow(true);
  };
  const closeTooltip = () => {
    setPopoverShow(false);
  };
  const handleEdit = () => {
    setEditProductData(currentProduct);
    setEditFormRef();
  }
  const handleDelete = () => {
    deleteFromCurrentProductList(currentProduct)
    deleteUrlList(currentUser,currentProduct)
    removeCurrentProduct()
  }
  const handleSave =()=> {
    updateUrlList(currentUser,{...currentProduct, thresholdAlertStatus:thresholdStatus,activeStatus:productActiveStatus})
    setCurrentProduct({...currentProduct, thresholdAlertStatus:thresholdStatus,activeStatus:productActiveStatus})
    updateCurrentProductList({...currentProduct, thresholdAlertStatus:thresholdStatus,activeStatus:productActiveStatus})
  }

  useEffect(() => {
    if(currentProduct){
      setProductActiveStatus(currentProduct.activeStatus)
      setThresholdStatus(currentProduct.thresholdAlertStatus)
    }
   
  }, [])

  return (
    <>
      {
        currentProduct ? (
           <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">  
                      {
                        currentProduct.imageUrl ? (
                            <img
                              alt="... No Image"
                              src={currentProduct.imageUrl}
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                            />
                        ) : (
                          null
                        )
                      }
                     
                  </div>
                </div>
              </div>
              <div className="text-center mt-20">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {currentProduct.ProductTagName}
                </h3>
                <div 
                  className="mb-2 text-blueGray-600 mt-10"
                  onMouseEnter={openTooltip}
                  onMouseLeave={closeTooltip}
                  ref={btnRef}
                >
                  <i className="fas fa-bookmark mr-2 text-lg text-blueGray-400"></i>
                  <a href="https://www.google.com/webhp?source=search_app">
                    {currentProduct.productName.slice(0,25)+ "..."}
                  </a>
                  
                  <div
                    className={
                      (popoverShow ? "" : "hidden ") +
                      "bg-lightBlue-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                    }
                    ref={popoverRef}
                  >
                    <div>
                      <div className="text-white p-3">
                       {currentProduct.productName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-rupee-sign mr-2 text-lg text-blueGray-400"></i>
                  {currentProduct.currentPrice }
                </div>
              </div>

              <div className="mt-5 py-10 border-t border-blueGray-200 ">
                <div className="flex flex-wrap ">
                  <div className="w-full px-4 flex flex-wrap justify-between m-2">
                      
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                    Treshold Price
                    </span>
                    {" "}
                    <span className="mb-2 text-blueGray-600">
                      
                      <span className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                      <i className="fas fa-rupee-sign mr-2 text-sm text-blueGray-400"></i>{currentProduct.thresholdValue }
                      </span>
                    </span>

                  </div>
                  
                  <div className="w-full px-4 flex flex-wrap justify-between m-2">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                      Product Status
                    </span>
                    {" "}
                    <span className="mb-2 text-blueGray-600">
                      <span className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  ">
                        {
                          currentProduct.activeStatus ? (
                            <>
                              <i className="fas fa-circle text-emerald-500 mr-2"></i>
                                Active
                            </>
                          ) : (
                            <>
                              <i className="fas fa-circle text-red-500 mr-2"></i> Inactive
                            </>
                          )
                        }
                        <ProductProfileDropdown typeState={productActiveStatus} changeState={setProductActiveStatus} setIsChanged={setIsChanged}/>
                      </span>
                    </span>
                  </div>
                  <div className="w-full px-4 flex flex-wrap justify-between m-2">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                      Treshold Status
                    </span>
                    {" "}
                    <span className="mb-2 text-blueGray-600">
                      <span className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  ">
                      {
                          currentProduct.thresholdAlertStatus ? (
                            <>
                              <i className="fas fa-circle text-emerald-500 mr-2"></i>
                                Active
                            </>
                          ) : (
                            <>
                              <i className="fas fa-circle text-red-500 mr-2"></i> Inactive
                            </>
                          )
                        }
                        <ProductProfileDropdown typeState={thresholdStatus} changeState={setThresholdStatus} setIsChanged={setIsChanged}/>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=> handleEdit()}
                    >
                      EDIT
                    </button>
                  </div>
                </div>
                {
                  isChanged ? (
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <button
                          className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={()=> handleSave()}
                        >
                          SAVE CHANGES
                        </button>
                      </div>
                    </div>
                  ) : (
                    null
                  )
                }
                
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=> handleDelete()}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div></div>
        )
      }
     
    </>
  );
}

const mapStateToProps = state => ({
  currentUser : state.user.currentUser,
  currentProduct : state.currentProduct.currentProduct
})

const mapDispatchToProps = dispatch => ({
  setEditProductData : product => dispatch(setEditProductData(product)),
  removeCurrentProduct : () => dispatch(removeCurrentProduct()),
  setCurrentProduct : product => dispatch(setCurrentProduct(product)),
  updateCurrentProductList : product => dispatch(updateCurrentProductList(product)),
  deleteFromCurrentProductList : product => dispatch(deleteFromCurrentProductList(product))

})

export default connect(mapStateToProps,mapDispatchToProps)(ProductProfile);