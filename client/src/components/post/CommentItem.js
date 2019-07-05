import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { deleteComment } from "../../actions/postActions"

const mapStateToProps = state => ({
  auth: state.auth
})

class CommentItem extends Component {
  onDeleteClick(id, comment) {
    this.props.deleteComment(id, comment)
  }

  render() {
    console.log("ini props")
    console.log(this.props)

    const { auth, comment, postId } = this.props

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href={`/profile/${comment.name}`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={() => this.onDeleteClick(postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem)
