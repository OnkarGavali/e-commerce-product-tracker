import React, { useEffect } from "react";
import PropTypes from "prop-types";

// components



import { connect } from "react-redux";
import ChartProductTableDropdown from "components/Dropdowns/ChartProductTableDropdown";

function ChartProductTable({ color, chartProductList }) {
  
  useEffect(() => {
    
  }, [chartProductList])
  return (
    <>
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                    }
                  >
                    Prodcut Table <small>(Todays Top Changes)</small>
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Product Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Current Prices
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Request Status
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      % Change
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      threshold Value
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {
                  chartProductList.length ? (

                      chartProductList.map( (product)=> {
                        return (<tr key={product.id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img
                              src={product.imageUrl}
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            ></img>{" "}
                            <span
                              className={
                                "ml-3 font-bold " +
                                +(color === "light" ? "text-blueGray-600" : "text-white")
                              }
                            >
                            {product.ProductTagName.length >15 ? (product.ProductTagName.slice(0,15)+"...") :product.ProductTagName }
                            </span>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          { product.currentPrice  ? ( product.currentPrice + " Rs." ):  "No Data" }
                          {console.log(product.currentPrice)}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          
                            {
                            (product.profit != -1000) ?( (Math.round(product.profit * 100) / 100).toFixed(2) + " %" ): 0 + " %"
                            }
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {
                              product.thresholdAlertStatus ? (
                                "Inactive"
                              ) : (
                                product.thresholdValue
                              )
                            }
                          </td>
                          <td>
                            <ChartProductTableDropdown  product={product}/>
                          </td>
                        </tr>
                        )
                      })
                      
                    ) : (
                      <div> No DATA</div>
                    )
                  } 
                </tbody>

              </table>

            </div>
          </div>
        </>
  );
}

ChartProductTable.defaultProps = {
  color: "light",
};

ChartProductTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

const mapStateToProps = state => ({
  chartProductList : state.chartProductList.chartProductList,
})


export default connect(mapStateToProps)(ChartProductTable);
