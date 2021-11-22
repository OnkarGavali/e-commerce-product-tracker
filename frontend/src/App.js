import React, { useEffect} from 'react'
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


const App = ({currentUser, setCurrentUser}) => {
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
        })
        return () => {
            unSubscribeFromAuth();
        }
        
    }, [])

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
  setCurrentUser : user => dispatch( setCurrentUser(user) )
})

export default connect( mapStateToProps, mapDispatchToProps )(App);
