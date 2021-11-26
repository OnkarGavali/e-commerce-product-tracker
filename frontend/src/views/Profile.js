import React, { useEffect, useState } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { connect } from "react-redux";
import { auth } from "firebase/firebase.utils";
import { Link } from "react-router-dom";
import { ProfileTable } from "components/ProfileTable/ProfileTable";
import { getUrlList } from "utils/firebaseUserData.utils";
import { rankProductList } from "utils/DataCooking.utils";
import { setCurrentProductList } from "redux/userProductCollection/userProductCollectionActions";

function Profile({currentUser,currentProductList,setCurrentProductList }) {
  
  const [productList, setProductList] = useState(currentProductList)
  const [isLoading, setIsLoading] = useState(true)
  useEffect( async () => {
      // if(!currentProductList.length){
      //   const data = await getUrlList(currentUser)
      //     console.log(data.length,data)
      //     let rankedList = []
      //     if(data[0]){
      //         data.map(prod =>{
      //             console.log("hi we are in rankedlist 1st loop")
      //             console.log("rankedlist prices[6]",prod.prices[6])
      //             if(prod && (prod.prices[6]!=null))
      //             {
      //                 const priceChangeRate = 100 * (prod.prices[6] - prod.prices[7])/prod.prices[6]
      //                 rankedList.push({...prod,profit:priceChangeRate})
      //             } else {
      //                 rankedList.push({...prod,profit:-1000})
      //             }
      //         } )
      //         rankedList.sort((a,b)=> {return a.profit - b.profit})
      //     }
      //     console.log(rankedList)
      //     if(rankedList){
      //       setCurrentProductList(rankedList)
      //   }    
      // }
      setProductList(currentProductList)
      console.log("hi",currentProductList.length) 
      setIsLoading(false)
       
    }, [])
  
    useEffect(() => {
      if(!isLoading){
        console.log(productList)
      }
    }, [productList,isLoading])


  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {currentUser && currentUser.displayName}
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=> auth.signOut()}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                         {
                           currentProductList ? currentProductList.length : 0
                         }
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Current Product
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 border-t border-blueGray-200 bg-blueGray-100" >
                  <div className="flex flex-wrap mt-2 py-10" >
                    {
                      isLoading ? (
                        <div>a</div>
                      ) : (
                        <div className="w-full mb-1 px-4">
                          {
                            currentProductList.length ? (
                              <ProfileTable productList={currentProductList}/>
                            ) : (
                              null
                            )
                          }
                          
                        </div>
                      )
                    }
                    
                    <div className="w-full  px-4 text-center">
                      <Link
                        to="dashboard"
                        className="font-normal text-lightBlue-500"
                      > 
                       Go to DashBoard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = state => ({
  currentUser : state.user.currentUser,
  currentProductList : state.productList.currentProductList
})

const mapDispatchToProps = dispatch => ({
  setCurrentProductList : productList => dispatch(setCurrentProductList(productList))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);