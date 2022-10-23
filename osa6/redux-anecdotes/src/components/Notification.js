import { connect } from 'react-redux'

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.visible ? 'block' : 'none',
  }
  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)