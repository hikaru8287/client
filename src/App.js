import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      name: 'sender@example.com',
      email: 'recipient@example.com'
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  handleClick(event){
    /*const messageHtml =  renderEmail(
      <MyEmail name={this.state.name}> {this.state.feedback}</MyEmail>
    );*/
    
    axios({
      method: "POST", 
      url:"http://localhost:3000/send", 
      data: {
        name: this.state.name,
        email: this.state.email,
        //messageHtml: messageHtml
      }
    }).then((response)=>{
      if (response.data.msg === 'success'){
        alert("Email sent, awesome!"); 
        //this.resetForm()
      }else if(response.data.msg === 'fail'){
        alert("Oops, something went wrong. Try again")
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h3>Test Send Mail</h3>
        <p className="App-intro">{this.state.data}</p>
        <button onClick={this.handleClick}>Send Mail</button>
      </div>
    );
  }
}

export default App;
