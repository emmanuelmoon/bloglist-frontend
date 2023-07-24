const Notification = ({message, messageClass}) => {
  if(message === '') {
    return null
  } else {
    return <div className={messageClass}>{message}</div>
  }
}

export default Notification