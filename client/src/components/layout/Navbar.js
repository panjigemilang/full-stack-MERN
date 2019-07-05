import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { logout } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"

const mapStateToProps = state => ({
  auth: state.auth
})

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    )

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Posts Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" onClick={e => onLogoutClick(e)} className="nav-link">
            <img
              src={user.avatar}
              alt={user.name}
              className="rounded-circle"
              style={{ marginRight: "5px", width: "25px" }}
              title="connecting your email to gavatar so you'll have avatar image"
            />
            Logout
          </a>
        </li>
      </ul>
    )

    const onLogoutClick = e => {
      e.preventDefault()
      this.props.clearCurrentProfile()
      this.props.logout()
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevKami
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { logout, clearCurrentProfile }
)(Navbar)
