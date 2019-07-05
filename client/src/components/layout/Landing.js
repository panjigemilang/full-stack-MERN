import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"

const mapStateToProps = state => ({
  auth: state.auth
})

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Kami</h1>
                <p className="lead">
                  {" "}
                  Untuk para developer yang ingin mencari teman developer lain,
                  kami menghubungkan kalian semua disini!!
                </p>
                <hr />
                <a href="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a href="/login" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Landing)