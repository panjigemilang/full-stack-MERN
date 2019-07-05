import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { registerusers } from "../../actions/authActions"
import { PropTypes } from "prop-types"
import TextFieldGroup from "../common/TextFieldGroup"

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {}
    }
  }

  // error handling
  componentWillReceiveProps(nextProps) {
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    }

    this.props.registerusers(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Daftar</h1>
              <p className="lead text-center">
                Buat akun DevKami mu sekarang juga!
              </p>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  value={this.state.name}
                  placeHolder="Name"
                  name="name"
                  onChange={e => this.onChange(e)}
                  errors={errors.name}
                />

                <TextFieldGroup
                  type="email"
                  value={this.state.email}
                  placeHolder="Email Address"
                  name="email"
                  onChange={e => this.onChange(e)}
                  errors={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a
                  Gravatar email"
                />

                <TextFieldGroup
                  type="password"
                  value={this.state.password}
                  placeHolder="Password"
                  name="password"
                  onChange={e => this.onChange(e)}
                  errors={errors.password}
                />

                <TextFieldGroup
                  type="password"
                  value={this.state.passwordConfirm}
                  placeHolder="Password Confirm"
                  name="passwordConfirm"
                  onChange={e => this.onChange(e)}
                  errors={errors.passwordConfirm}
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

// ini khusus buat redux gitu?
Register.propTypes = {
  registerusers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { registerusers }
)(withRouter(Register))
