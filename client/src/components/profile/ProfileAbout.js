import React, { Component } from "react"
import isEmpty from "../../validations/is-empty"
import PropTypes from "prop-types"

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props
    const firstname = profile.user.name.trim().split(" ")[0]
    const skills = !isEmpty(profile.skills)
      ? profile.skills.map((skill, index) => (
          <div className="p-3" key={index}>
            <i className="fa fa-check" /> {skill}
          </div>
        ))
      : null

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstname}'s Bio</h3>
            <p className="lead">
              {!isEmpty(profile.bio) ? <span>{profile.bio}</span> : null}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
