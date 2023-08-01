import PropTypes from 'prop-types'

const Notification = ({ message, messageClass }) => {
  if(message === '') {
    return null
  } else {
    return <div className={messageClass}>{message}</div>
  }
}


Notification.propsTypes = {
  message: PropTypes.string.isRequired,
  messageClass: PropTypes.object.isRequired
}


export default Notification