import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Footer from "./components/layout/Footer"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

import "./App.css"
import setAuthToken from "./utils/setAuthToken"
import jwt_decode from "jwt-decode"
import { setCurrentUser, logout } from "./actions/authActions"
import Dashboard from "./components/dashboard/Dashboard"
import { clearCurrentProfile } from "./actions/profileActions"
import PrivateRoute from "./components/common/PrivateRoute"
import CreateProfile from "./components/profile/CreateProfile"
import EditProfile from "./components/profile/EditProfile"
import AddExperience from "./components/experiences/AddExperience"
import AddEducation from "./components/educations/AddEducation"
import Profiles from "./components/profiles/Profiles"
import Profile from "./components/profile/Profile"
import NotFound from "./components/errors/NotFound"
import Posts from "./components/posts/Posts"
import Post from "./components/post/Post"

if (localStorage.jwtToken) {
  // set token to authorization
  setAuthToken(localStorage.jwtToken)

  // get user data and decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  // set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logout())
    // Clear current user
    store.dispatch(clearCurrentProfile())
    // redirect to login
    window.location.href = "/login"
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          {/* Router */}
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Route exact path="/not-found" component={NotFound} />
            {/* Switch used for any weird errors from redirect?? */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
