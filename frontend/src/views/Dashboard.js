import React, { useRef, useState } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import { ProductTable } from "components/Dashboard/ProductTable";
import CardTable from "components/Cards/CardTable";
import { UrlInputBox } from "components/Dashboard/UrlInputBox";
import ProductProfile from "components/Dashboard/ProductProfile";

export default function Dashboard() {
  
  const EditFormFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    return [ htmlElRef, setFocus ] 
  }
  const [editFormRef, setEditFormRef] = EditFormFocus()

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full  mb-12 xl:mb-0 px-4">
          <CardTable color="dark"/>
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
          <CardTable color="dark"/>
          <UrlInputBox editFormRef={editFormRef}/>
          <ProductTable />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
          <ProductProfile setEditFormRef={setEditFormRef}/>
        </div>
      </div>
    </>
  );
}
