import React from 'react'
import { createPopper } from "@popperjs/core";
import { connect } from 'react-redux';
import { addProductInChart } from 'redux/chartProducts/chartProductsActions';
import { setEditProductData } from 'redux/editProduct/editProductActions';
import { setCurrentProduct} from '../../redux/currentProduct/currentProductActions'

const DashboardProductTableDropdown = ({addProductInChart,product,chartProductList,setEditProductData,setEditFormRef,setCurrentProduct}) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "left-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const handleShowInChart = (e) => {
        e.preventDefault()
        if(chartProductList.length>=5)
        {
            alert("Only 5 products will be displayed in charts")
        } else{
            const checkList = chartProductList.find((pro) => pro.id == product.id)
            if(!checkList){
                addProductInChart(product)
            } else {
                 alert("Products already in charts")
            }
           
        }
        closeDropdownPopover()
    }

    const handleEdit = (e) => {
        e.preventDefault()
        setEditProductData(product)
        closeDropdownPopover()
        setCurrentProduct(product)
        setEditFormRef();
    }
    return (
        <>
            <a
                className="text-blueGray-500 py-1 px-3"
                href="#pablo"
                ref={btnDropdownRef}
                onClick={(e) => {
                e.preventDefault();
                dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <i className="fas fa-ellipsis-v"></i>
            </a>
            <div
                ref={popoverDropdownRef}
                className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                }
            >
                <a
               
                className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={(e) => handleShowInChart(e)}
                >
                Show in Chart
                </a>
                <a
                
                className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={(e) => handleEdit(e)}
                >
                Edit
                </a>
                <a
                
                className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                }
                onClick={(e) => e.preventDefault()}
                >
                Delete
                </a>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    chartProductList : state.chartProductList.chartProductList
})


const mapDispatchToProps = dispatch => ({
    addProductInChart : (product) => dispatch(addProductInChart(product)),
    setEditProductData : (product) => dispatch(setEditProductData(product)),
    setCurrentProduct : (product) => dispatch(setCurrentProduct(product))
})

export default connect( mapStateToProps, mapDispatchToProps )(DashboardProductTableDropdown);