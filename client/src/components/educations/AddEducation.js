import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { addEducation } from "../../actions/profileActions"

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

class AddEducation extends Component {
  constructor() {
    super()
    this.state = {
      institution: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const eduData = {
      institution: this.state.institution,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addEducation(eduData, this.props.history)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any institution, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  placeHolder="* institution"
                  name="institution"
                  value={this.state.institution}
                  onChange={e => this.onChange(e)}
                  errors={errors.institution}
                />
                <TextFieldGroup
                  placeHolder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={e => this.onChange(e)}
                  errors={errors.degree}
                />
                <TextFieldGroup
                  placeHolder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={e => this.onChange(e)}
                  errors={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={e => this.onChange(e)}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={e => this.onChange(e)}
                  errors={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={() => this.onCheck()}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeHolder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.onChange(e)}
                  errors={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation))
