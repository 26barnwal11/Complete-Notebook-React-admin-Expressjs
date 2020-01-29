import React, { Component } from "react";
import "./App.css"
export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      list: true,
      card: false,
      notebook: [],
      note: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:3002/list")
    .then(response => response.json())
    .then( responseJson=> {
      this.setState({ notebook:responseJson });
    },
  )};

  showCard=id=> {
    fetch(`http://localhost:3002/list/${id}`)
    .then(response => response.json())
    .then(
      responseJson=> {this.setState({ note:responseJson[0] })}
    );
    this.setState({
      list:false,
      card:true
    });
  };

  showList = () => {
    this.setState({
      card: false,
      list: true
    });
 };

 render(){
  return(
  <div className ="container">
    {this.state.list ? (
          <div className="list-group">
            {this.state.notebook.map(note => (
              <li
                onClick={() => this.showCard(note.id)}
                className="list-group-item list-group-item-action"
              >
                {note.title}
              </li>
            ))}
          </div>
        ) : null}
    {this.state.card ? (
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">{this.state.note.title}</h5>
              <p class="card-text">{this.state.note.description}</p>
              <div onClick={() => this.showList()} class="btn btn-primary">
                Back
              </div>
            </div>
          </div>
        ) : null}
  </div>
  )
  }
}
