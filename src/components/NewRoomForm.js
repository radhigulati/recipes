import React from "react";

class NewRoomList extends React.Component {
  constructor() {
    super();

    this.state = {
      roomName: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);

    this.setState({
      roomName: ""
    });
  };

  handleInput = e => {
    this.setState({
      roomName: e.target.value
    });
  };

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Create a room"
            value={this.state.roomName}
            onChange={this.handleInput}
            maxLength="20"
          />
        </form>
      </div>
    );
  }
}

export default NewRoomList;
