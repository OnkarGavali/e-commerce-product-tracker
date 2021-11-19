import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import TableDropdown from "components/Dropdowns/TableDropdown";

// components

export default function ProductProfile({setEditFormRef}) {
  const [imageUrl, setimageUrl] = useState(".asas.jpg?")
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
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">  
                  <img
                    alt="... No Image"
                    src="https://rukminim1.flixcart.com/image/880/1056/kg9qbgw0/backpack/f/s/w/spacy-unisex-backpack-with-rain-cover-and-reflective-strip-black-original-imafwjxd4qctmvgg.jpeg?q=50"
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
              </div>
            </div>
          </div>
          <div className="text-center mt-20">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              Jenna Stones
            </h3>
            <div 
              className="mb-2 text-blueGray-600 mt-10"
              onMouseEnter={openTooltip}
              onMouseLeave={closeTooltip}
              ref={btnRef}
            >
              <i className="fas fa-bookmark mr-2 text-lg text-blueGray-400"></i>
              <a href="https://www.google.com/webhp?source=search_app">
                Half name [:10]
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
                    Fulll NAmeeeeeeeeeeeeeeeeeeeeee aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-rupee-sign mr-2 text-lg text-blueGray-400"></i>
              4000
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
                  
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap ">
                  <i className="fas fa-rupee-sign mr-2 text-sm text-blueGray-400"></i>4000
                  </td>
                </span>


              </div>
              
              <div className="w-full px-4 flex flex-wrap justify-between m-2">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                  Treshold Status
                </span>
                {" "}
                <span className="mb-2 text-blueGray-600">
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  ">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i>
                      Active
                    <TableDropdown />
                  </td>
                </span>
              </div>
              <div className="w-full px-4 flex flex-wrap justify-between m-2">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1">
                  Treshold Status
                </span>
                {" "}
                <span className="mb-2 text-blueGray-600">
                  <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  ">
                   <i className="fas fa-circle text-red-500 mr-2"></i> Inactive
                    <TableDropdown />
                  </td>
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
                  onClick={()=> setEditFormRef()}
                >
                  EDIT
                </button>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                <button
                  className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={()=> alert('hi')}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
