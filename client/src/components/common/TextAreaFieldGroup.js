import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const TextAreaFieldGroup = ({
  name,
  info,
  errors,
  value,
  max,
  placeHolder,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        maxLength={max}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        style={{ resize: "none", height: "15vh" }}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  value: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup
