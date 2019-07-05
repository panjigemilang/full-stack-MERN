import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import { loginuser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      errors: {}
    }
  }

  // logged in and error handling
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  // handle if user logged in yet try to direct to auth pages
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginuser(userData)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Masuk</h1>
              <p className="lead text-center">Masuk ke akun DevKami mu!</p>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  type="email"
                  value={this.state.email}
                  placeHolder="Email Address"
                  name="email"
                  onChange={e => this.onChange(e)}
                  errors={errors.email}
                />

                <TextFieldGroup
                  type="password"
                  value={this.state.password}
                  placeHolder="Password"
                  name="password"
                  onChange={e => this.onChange(e)}
                  errors={errors.password}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// excuse me wtf?
Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { loginuser }
)(Login)
