import React from "react";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: ""
    };
  }

  onChange = e => {
    this.setState({
      userName: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.userName);
  };

  render() {
    return (
      <div className="login">
        <h1>Enter your username</h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.userName}
            spellCheck="false"
            maxLength="15"
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}

export default LogIn;
