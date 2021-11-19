import React, { useState } from 'react'

export const UrlInputBox = ({editFormRef}) => {

    const [insertedUrl, setInsertedUrl] = useState("")
    const handleSubmit = () => {
        if(insertedUrl.indexOf( "https://www.amazon.in/") !== -1 ) {
                    alert("Invalid URL");
        } else if( insertedUrl.indexOf( "https://www.flipkart.com/") !== -1 ) {
            alert("Invalid URL")
        } else {
            alert("a")
        }
        setInsertedUrl("")
    }
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Want to get a Notification of the Product?</h6>
                            
                        {
                            insertedUrl.length > 0 ? (
                                <button
                                className="disabled:bg-lightBlue-100 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>handleSubmit()}
                                
                                >
                                ADD Product
                                </button>
                            ) : (
                                null
                            )
                        }
                        
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
                                Give Me The Special Name
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue="Lucky"
                                ref={editFormRef}
                            />
                            </div>
                        </div>
                        <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Fill me with URL
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
                                    Is there any Perticular Price value below that you want get Notified? <small>(optional)</small>
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    defaultValue="Lucky"
                                />
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            </>
    )
}
