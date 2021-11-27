import React, { useEffect, useState } from 'react'

// components


import DashboardProductTableDropdown from 'components/Dropdowns/DashboardProductTableDropdown';
import { connect } from 'react-redux';
import { setCurrentProduct } from 'redux/currentProduct/currentProductActions';


const ProductTable = ({setEditFormRef,currentProductList,setCurrentProduct}) => {
    const [productList, setProductList] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(  () => {
        setProductList(currentProductList)
        setisLoading(false)
    }, [currentProductList])
  
    useEffect(() => {
      console.log(productList)
    }, [productList])
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                Product Table
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Name
                                </th>
                                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Cur. Price
                                </th>
                                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Status
                                </th>
                                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                % change
                                </th>
                                <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Threshold Price
                                </th>
                                <th className="px-1 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                
                                </th>
                                
                            </tr>
                    </thead>
                    <tbody>
                        {
                            currentProductList && (!isLoading) ? (
                                currentProductList.map((product)=> (<tr key={product.id}>
                                        <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                            <a onClick={()=>setCurrentProduct(product)}>
                                                { product.ProductTagName ? (
                                                    product.ProductTagName.length >20 ? (product.ProductTagName.slice(0,20)+"...") : product.ProductTagName 
                                                    ) : (
                                                        "No Name"
                                                    )
                                                }    
                                            </a>
                                        </th>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        { product.currentPrice  ? ( product.currentPrice + " Rs." ):  "No Data" }
                                        </td>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {
                                            product.activeStatus ? (
                                                <>
                                                <i className="fas fa-circle text-emerald-500 mr-2"></i> Active
                                                </>
                                            ) : (
                                                <>
                                                <i className="fas fa-circle text-red-500 mr-2"></i> Inctive
                                                </>
                                            )
                                        }
                                        </td>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        
                                        {
                                            (product.profit != -1000) ? (
                                                <>
                                                    {
                                                        (Math.round(product.profit * 100) / 100).toFixed(2) > 0 ? (
                                                            <>
                                                                <i className="fas fa-arrow-down text-emerald-500 mr-4"></i>
                                                                {(Math.round(product.profit * 100) / 100).toFixed(2) + " %"}
                                                            </>
                                                        ) : (
                                                            <>
                                                            <i className="fas fa-arrow-up text-red-500 mr-4"></i>
                                                                {-1*(Math.round(product.profit * 100) / 100).toFixed(2) + " %"}
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                0 + " %"
                                            )
                                        }
                                        
                                        </td>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                       
                                        {
                                            product.thresholdAlertStatus ? (
                                                <>
                                                <i className="fas fa-circle text-emerald-500 mr-2"></i>
                                                {product.thresholdValue} 
                                                
                                                </>
                                            ) : (
                                                <>
                                                <i className="fas fa-circle text-red-500 mr-2"></i> 
                                                {product.thresholdValue + " Rs."} 
                                                
                                                </>
                                            )
                                        }
                                        </td>
                                        <td className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                            <DashboardProductTableDropdown product={product} setEditFormRef={setEditFormRef}/>
                                        </td>
                                    </tr>
                            ))) : (
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                                
                            )
                        }
                        
                            
                        </tbody>
                    </table>
                </div>
            </div> 
        </>
    )
}




const mapStateToProps = state => ({
    currentProductList : state.productList.currentProductList
})

const mapDispatchToProps = dispatch => ({
    setCurrentProduct : (product) => dispatch(setCurrentProduct(product))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductTable);