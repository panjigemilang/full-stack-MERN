import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"
import { Link } from "react-router-dom"
import Spinner from "../common/Spinner"
import ProfileActions from "./ProfileActions"
import Experience from "./Experience"
import Education from "./Education"

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onButtonDelete(e) {
    e.preventDefault()
    this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    console.log(loading)

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check if user had a profile or not
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome
              <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experiences={profile.experiences} />
            <Education education={profile.education} />
            <br />
            <button
              onClick={e => this.onButtonDelete(e)}
              className="btn btn-sm btn-danger text-white"
            >
              Delete Account
            </button>
          </div>
        )
      } else {
        // User doesn't have profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet any profile to display.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

    return <div>{dashboardContent}</div>
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard)
