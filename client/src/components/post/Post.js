import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PostItem from "../posts/PostItem"
import Spinner from "../common/Spinner"
import { getPost } from "../../actions/postActions"
import CommentForm from "./CommentForm"
import CommentFeed from "./CommentFeed"

const mapStateToProps = state => ({
  post: state.posts
})

class Posts extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props.post
    let postContent = null

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostItem post={post} showAction={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Go Back
              </Link>
              {postContent}
              <hr />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { getPost }
)(Posts)
