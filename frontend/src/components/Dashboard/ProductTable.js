import React, { useEffect, useState } from 'react'

// components


import DashboardProductTableDropdown from 'components/Dropdowns/DashboardProductTableDropdown';
import { connect } from 'react-redux';
import { addProductInChart } from 'redux/chartProducts/chartProductsActions';

const ProductTable = ({setEditFormRef,currentProductList}) => {
    const [productList, setProductList] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(  () => {
        setProductList(currentProductList)
        setisLoading(false)
    }, [])
  
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
                                        {product.ProductTagName ? (
                                            product.ProductTagName.length >15 ? (product.ProductTagName.slice(0,15)+"...") : product.ProductTagName 
                                            ) : (
                                                "No Name"
                                            )
                                        }    
                                        </th>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        4,569
                                        </td>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        340
                                        </td>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                        46,53%
                                        </td>
                                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                        46,53%
                                        </td>
                                        <td className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                            <DashboardProductTableDropdown product={product} setEditFormRef={setEditFormRef}/>
                                        </td>
                                    </tr>
                            ))) : (
                                <tr>
                                    <td>
                                    NO DATA{
                                    console.log("emty list")
                                }
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



export default connect(mapStateToProps)(ProductTable);