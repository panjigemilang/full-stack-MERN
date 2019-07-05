import React, { Component } from "react"
import Moment from "react-moment"

class ProfileCreds extends Component {
  render() {
    const { education, experiences } = this.props

    let experienceContent = experiences.map(exp => (
      <li className="list-group-item" key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ))

    let educationContent = education.map(edu => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.institution}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        <p>
          {edu.location === "" ? null : (
            <span>
              <strong>Field Of Study: </strong> {edu.fieldofstudy}
            </span>
          )}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ))
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experienceContent}
          <ul className="list-group" />
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educationContent}
          <ul className="list-group" />
        </div>
      </div>
    )
  }
}

export default ProfileCreds
