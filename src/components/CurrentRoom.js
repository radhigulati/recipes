import React from "react";

class CurrentRoom extends React.Component {
  render() {
    if (!this.props.roomName) {
      return <div className="current-room" />;
    }
    return <div className="current-room">#{this.props.roomName}</div>;
  }
}

export default CurrentRoom;
