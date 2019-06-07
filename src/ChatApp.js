import "./App.css";
import React, { Component } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import Chatkit from "@pusher/chatkit-server";

import MessageList from "./components/MessageList";
import NewRoomForm from "./components/NewRoomForm";
import RoomList from "./components/RoomList";
import SendMessageForm from "./components/SendMessageForm";
import User from "./components/User";
import CurrentRoom from "./components/CurrentRoom";
import LogIn from "./components/LogIn";

const instanceLocator = "v1:us1:6a2e8d64-de2c-4728-bd5f-4588be896c7e";
const key =
  "34f5b10f-fda2-4550-964b-72e88c127dc5:4sgsF8Q4yolUSYhGole17VX0W20FldySW2zbNtdd314=";
const testToken =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6a2e8d64-de2c-4728-bd5f-4588be896c7e/token";

class ChatApp extends Component {
  constructor() {
    super();

    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      roomName: null,
      userName: "",
      isLoggedIn: false
    };
  }
  // only when when component is mounted onto DOM and triggered after render
  componentDidMount() {
    this.checkCachedUsername();
  }

  //everytime component is rendered
  componentDidUpdate() {
    const chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: this.state.userName,
      tokenProvider: new TokenProvider({
        url: testToken
      })
    });
    // chatManager return a promise
    // when that promise is resolved we get access to the currentUser
    // the currentUser is our interface for chatting with the chatkit api
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;

      this.getRooms();
    });
  }

  logIn = userName => {
    const chatkit = new Chatkit({
      instanceLocator: instanceLocator,
      key: key
    });

    chatkit
      // create user returns a promise
      .createUser({
        id: userName,
        name: userName
      })
      .then(() => {
        this.setState({
          userName,
          isLoggedIn: true
        });
      })
      .catch(err => {
        console.log("Error creating user: " + err);
      });
  };

  getRooms = () => {
    // return a promise
    this.currentUser
      .getJoinableRooms()
      // when promise has been resolved we get access to the joinable rooms
      .then(joinableRooms => {
        this.setState({
          joinedRooms: this.currentUser.rooms,
          joinableRooms
        });
      })
      .catch(err => {
        console.log(`Error fetching joinableRooms: ${err}`);
      });
  };

  subscribeToRoom = roomId => {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          //onMessage listens for new messages
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        },
        messageLimit: 5
      })
      .then(room => {
        this.setState({
          roomId: room.id,
          roomName: room.name
        });
      });
    this.getRooms();
  };

  createRoom = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => {
        this.subscribeToRoom(room.id);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
  };

  sendMessage = text => {
    this.currentUser
      .sendMessage({
        text,
        roomId: this.state.roomId
      })
      .catch(err => {
        console.log(`Error adding message: ${err}`);
      });
  };

  checkCachedUsername = () => {
    const userName = localStorage.getItem("userName");
    //(!userName) and isLoggedIn: false
    if (!userName) {
      this.setState({
        userName,
        isLoggedIn: false
      });
    }
  };

  render() {
    // login screen
    if (!this.state.isLoggedIn) {
      return <LogIn onSubmit={this.logIn} />;
    }

    return (
      <div className="App">
        <User userName={this.state.userName} />
        <CurrentRoom roomName={this.state.roomName} />
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <NewRoomForm createRoom={this.createRoom} />
        <div className="App__sub-grid" ref={this.myRef}>
          <MessageList
            messages={this.state.messages}
            roomId={this.state.roomId}
            userName={this.state.userName}
          />
        </div>
        <SendMessageForm
          sendMessage={this.sendMessage}
          roomId={this.state.roomId}
          roomName={this.state.roomName}
        />
      </div>
    );
  }
}

export default ChatApp;
