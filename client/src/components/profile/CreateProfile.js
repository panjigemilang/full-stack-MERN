import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import SelectListGroup from "../common/SelectListGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import InputGroup from "../common/InputGroup"
import { createProfile } from "../../actions/profileActions"

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

class CreateProfile extends Component {
  constructor() {
    super()
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      github: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      youtube: "",
      dribbble: "",
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      github: this.state.github,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      dribbble: this.state.dribbble
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            name="linkedin"
            placeHolder="https://linkedin.com/.../your_username"
            value={this.state.linkedin}
            icon="fab fa-linkedin"
            onChange={e => this.onChange(e)}
            errors={errors.linkedin}
          />

          <InputGroup
            name="dribbble"
            placeHolder="https://dribbble.com/your_username"
            value={this.state.dribbble}
            icon="fab fa-dribbble"
            onChange={e => this.onChange(e)}
            errors={errors.dribbble}
          />

          <InputGroup
            name="instagram"
            placeHolder="https://instagram.com/your_username"
            value={this.state.instagram}
            icon="fab fa-instagram"
            onChange={e => this.onChange(e)}
            errors={errors.instagram}
          />

          <InputGroup
            name="youtube"
            placeHolder="https://youtube.com/your_username"
            value={this.state.youtube}
            icon="fab fa-youtube"
            onChange={e => this.onChange(e)}
            errors={errors.youtube}
          />

          <InputGroup
            name="facebook"
            placeHolder="https://facebook.com/your_username"
            value={this.state.facebook}
            icon="fab fa-facebook"
            onChange={e => this.onChange(e)}
            errors={errors.facebook}
          />

          <InputGroup
            name="twitter"
            placeHolder="https://twitter.com/your_username"
            value={this.state.twitter}
            icon="fab fa-twitter"
            onChange={e => this.onChange(e)}
            errors={errors.twitter}
          />
        </div>
      )
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your Profile</h1>
              <p className="lead text-center">Let's Go beybeee!</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  placeHolder="* Profile name"
                  name="handle"
                  value={this.state.handle}
                  onChange={e => this.onChange(e)}
                  errors={errors.handle}
                  info="Insert your name here"
                />

                <SelectListGroup
                  placeHolder="* Select Profressional Status"
                  name="status"
                  value={this.state.status}
                  onChange={e => this.onChange(e)}
                  options={options}
                  info="Give us an idea with your status"
                  errors={errors.status}
                />

                <TextFieldGroup
                  placeHolder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={e => this.onChange(e)}
                  info="Could be your own company or one you work for"
                  errors={errors.company}
                />

                <TextFieldGroup
                  placeHolder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={e => this.onChange(e)}
                  errors={errors.website}
                  info="Portofolio or something that you wanted to show"
                />

                <TextFieldGroup
                  placeHolder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={e => this.onChange(e)}
                  errors={errors.location}
                  info="A location where you lived"
                />

                <TextFieldGroup
                  placeHolder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={e => this.onChange(e)}
                  errors={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />

                <TextFieldGroup
                  placeHolder="Github Username"
                  name="github"
                  value={this.state.github}
                  onChange={e => this.onChange(e)}
                  errors={errors.github}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaFieldGroup
                  placeHolder="Short Bio"
                  max="200"
                  name="bio"
                  value={this.state.bio}
                  onChange={e => this.onChange(e)}
                  error={errors.bio}
                  info="Tell us a little about yourself (Max. 200 words)"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    className="btn btn-dark text-white"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  onSubmit={e => this.onSubmit(e)}
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile))
