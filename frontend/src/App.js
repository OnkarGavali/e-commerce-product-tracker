import React, { useEffect, useState} from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


// layouts


import Auth from "layouts/Auth.js";

// views without layouts


import Profile from "views/Profile.js";
import Index from "views/Index.js";

import { setCurrentUser } from 'redux/user/userActions';
import { auth, createUserProfileDocument } from 'firebase/firebase.utils';
import DashboardLayout from 'layouts/DashboardLayout';
import { setCurrentProductList } from 'redux/userProductCollection/userProductCollectionActions';
import { getUrlList } from 'utils/firebaseUserData.utils';
import { rankProductList } from 'utils/DataCooking.utils';


const App = ({currentUser, setCurrentUser, setCurrentProductList,currentProductList}) => {
    const [productList, setProductList] = useState(null)
    //const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                    setCurrentUser( {
                        id: snapShot.id,
                        ...snapShot.data()
                        }
                    );
                })
            } else {
                setCurrentUser(userAuth)
            }
        }) 
        
            
            
            
        

        return () => {
            unSubscribeFromAuth();
        }
    }, [])
    useEffect(async () => {
        if(!currentProductList.length){
        const data = await getUrlList(currentUser)
            let rankedList = []
            if(data){
                data.map(prod =>{
                    console.log("hi we are in rankedlist 1st loop")
                    console.log("rankedlist prices[6]",prod.prices[6])
                    if(prod && (prod.prices[6]!=null))
                    {
                        const priceChangeRate = 100 * (prod.prices[6] - prod.prices[7])/prod.prices[6]
                        rankedList.push({...prod,profit:priceChangeRate})
                    } else {
                        rankedList.push({...prod,profit:-1000})
                    }
                } )
                rankedList.sort((a,b)=> {return a.profit - b.profit})
            }
            console.log(rankedList)
            if(rankedList){
                setCurrentProductList(rankedList)
            } 
        }
    }, [currentUser,currentProductList])
    
    return (
        <React.Fragment>
            <Switch>
                {/* add routes with layouts */}
                <Route path="/dashboard" component={DashboardLayout} />
                <Route path="/auth" render={ () => currentUser ? (<Redirect to='/profile' />) : (<Auth/>)}/>
                {/* add routes without layouts */}
                <Route path="/profile" exact render={ () => currentUser ? (<Profile/>) : (<Redirect to='/auth/login' />)} />
                <Route path="/" exact component={Index} />
                {/* add redirect for first page */}
                <Redirect from="*" to="/" />
            </Switch>
        </React.Fragment>
    )
}

const mapStateToProps = ({user,productList}) => ({
  currentUser : user.currentUser,
  currentProductList: productList.currentProductList
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch( setCurrentUser(user) ),
  setCurrentProductList : productList => dispatch(setCurrentProductList(productList))
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
