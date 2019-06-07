import React from "react";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  handleClick = () => {
    this.sendMessage();
  };

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.sendMessage();
    }
  };

  sendMessage() {
    this.props.sendMessage(this.state.message);

    this.setState({
      message: ""
    });
  }

  render() {
    if (this.props.roomName !== null) {
      return (
        <div className="send-message-form">
          <textarea
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            value={this.state.message}
            disabled={this.props.roomId === null ? true : false}
            placeholder={`Message #${this.props.roomName}`}
            rows="1"
          />
          <button className="search-button" onClick={this.handleClick}>
            Submit
          </button>
        </div>
      );
    }
    return <div className="send-message-form" />;
  }
}

export default SendMessageForm;
