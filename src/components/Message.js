import React from "react";

class Message extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="message-list__message">
        <img
          src={`https://identicon-api.herokuapp.com/${
            this.props.sender
          }/50?format=png`}
          alt="user avatar"
        />
        <div className="message-content">
          <div className="message-content__sender">{this.props.sender}</div>
          <div className="message-content__message">{this.props.message}</div>
        </div>
      </div>
    );
  }
}

export default Message;
