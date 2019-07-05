import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import setAuthToken from "../utils/setAuthToken"
import axios from "axios"
import jwt_decode from "jwt-decode"

// Register users
export const registerusers = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// login get user token
export const loginuser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data

      // set token to local storage
      localStorage.setItem("jwtToken", token)

      // Set token to Auth Header
      setAuthToken(token)
      // decode token to get user data with jwt-decode
      const decoded = jwt_decode(token)
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// set logged user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// logout
export const logout = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken")
  // Remove authorization token
  setAuthToken(false)
  // isAuthenticated = false, by empty the current user
  dispatch(setCurrentUser({}))
}
