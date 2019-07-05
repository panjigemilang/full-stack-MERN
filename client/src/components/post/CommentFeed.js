import React, { Component } from "react"
import PropTypes from "prop-types"
import CommentItem from "./CommentItem"

class CommentFeed extends Component {
  render() {
    const { postId, comments } = this.props

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ))
  }
}

CommentFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default CommentFeed
