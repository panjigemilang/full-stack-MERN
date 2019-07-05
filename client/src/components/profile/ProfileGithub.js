import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

class ProfileGithub extends Component {
  constructor() {
    super()
    this.state = {
      clientId: "65df2a917cff4d21a2e6",
      clientSecret: "c8b915201edcc921edc1d573c31657fb5786b153",
      count: 5,
      sort: " created: asc",
      repos: []
    }
  }

  componentDidMount() {
    const { username } = this.props

    const { clientId, clientSecret, count, sort } = this.state

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myref) {
          this.setState({
            repos: data
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { repos } = this.state
    console.log("ini apaan")
    console.log(repos)

    const githubContent = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <div className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </div>
            <div className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </div>
            <div className="badge badge-success">Forks: {repo.forks_count}</div>
          </div>
        </div>
      </div>
    ))

    return (
      <div ref="myref">
        <hr />
        <div className="container">
          <h3 className="mb-4">Latest Github Repos</h3>
          {githubContent}
        </div>
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.object.isRequired
}

export default ProfileGithub
