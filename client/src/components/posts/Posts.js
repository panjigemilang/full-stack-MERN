import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import PostForm from "./PostForm"
import PostFeed from "./PostFeed"
import Spinner from "../common/Spinner"
import { getPosts } from "../../actions/postActions"

const mapStateToProps = state => ({
  posts: state.posts
})

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.posts

    let postContent = null

    if (posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostForm />
          <PostFeed posts={posts} />
        </div>
      )
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{postContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
