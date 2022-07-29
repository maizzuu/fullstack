import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
