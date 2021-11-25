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
import { isConditionalExpression } from 'typescript';


const App = ({currentUser, setCurrentUser, setCurrentProductList}) => {
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
            //console.log(currentUser)
           setProductList(currentUser)
        }) 
        
            
            
            
        

        return () => {
            unSubscribeFromAuth();
        }
    }, [])
    useEffect( () => {
        // if(currentUser){
        //     const getProductList =  getUrlList(currentUser)
        //     .then((productli)=>{
        //         console.log(productli)
        //         const li = rankProductList(productli)
        //         .then((finalList)=>{
        //             if(finalList){
        //             setCurrentProductList(finalList)
        //         }
        //         console.log(finalList)
        //         })
                
        //     })}
    }, [productList])
    
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

const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch( setCurrentUser(user) ),
  setCurrentProductList : productList => dispatch(setCurrentProductList(productList))
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
