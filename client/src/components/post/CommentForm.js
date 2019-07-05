import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { addComment } from "../../actions/postActions"

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const { user } = this.props.auth
    const { postId } = this.props

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addComment(postId, newComment)
    this.setState({ text: "" })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="comment-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Comment Field</div>
          <div className="card-body">
            <form onSubmit={e => this.onSubmit(e)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Make a comment"
                  name="text"
                  value={this.state.text}
                  onChange={e => this.onChange(e)}
                  errors={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm)
