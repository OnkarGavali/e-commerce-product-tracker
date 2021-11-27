import React, { useEffect, useState } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { connect } from "react-redux";
import { checkHeader } from "utils/DataCooking.utils";

function HeaderStats({currentProductList}) {
  const [statData, setStatData] = useState(null)
  useEffect(() => {
    setStatData(checkHeader(currentProductList))
  }, [currentProductList])
  useEffect(() => {
   
  }, [statData])
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            {
              statData ? (
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle={"Total Products"}
                      statTitle={currentProductList.length}
                      statIconName="far fa-chart-bar"
                      statIconColor="bg-red-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="ACTIVE Product links"
                      statTitle={statData.activeProduct ? statData.activeProduct : 0}
                      statIconName="fas fa-chart-pie"
                      statIconColor="bg-orange-500"
                    />
                  </div>
                  
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Product whos price less than Yesterday "
                      statTitle={statData.productWhosPriceIsLessThanYesterday ? statData.productWhosPriceIsLessThanYesterday : 0}
                      statIconName="fas fa-users"
                      statIconColor="bg-pink-500"
                    />
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="Product below Threshold Price"
                      statTitle={statData.totalThresholdActiveProducts ? statData.totalThresholdActiveProducts :0}
                      statIconName="fas fa-percent"
                      statIconColor="bg-lightBlue-500"
                    />
                  </div>
                </div>
              ) : (
                null
              )
            }
            
          </div>
        </div>
      </div>
    </>
  );
}


const mapStateToProps = ({productList}) => ({
  currentProductList: productList.currentProductList
})

export default connect(mapStateToProps)(HeaderStats);