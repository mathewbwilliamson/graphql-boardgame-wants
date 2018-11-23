import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query, Mutation } from 'react-apollo';
import { PERSON, FEED_STUDENTS, SEARCHBGG } from './Queries';
import { CREATE_USER, CREATE_STUDENT } from './Mutations';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      birthDate: '',
      personId: 1,
      bggSearchTerm: 'concordia'
    }
  }
  componentDidMount(){
    var query = `{
      person(id: 1){
        name
        height
        mass
      }
    }`;
    
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(res => console.log(res.data));
  }
  render() {
    const {username, password, personId, bggSearchTerm} = this.state;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Query query={PERSON} variables={{personId}}>
        {({ loading, error, data })=>{
          if(loading) return <div>Loading...</div>
          if(error) return <div>Error {error}</div>
          return <div>
            <p>{data.person.name}</p>
            <p>{data.person.height}</p>
            <p>{data.person.mass}</p>
          </div>
        }}
        </Query>
        <p>Sign Up</p>
          <input type="text" placeholder="Username" value={username} onChange={e => this.setState({username: e.target.value})} />
          <input type="text" placeholder="Password" value={password} onChange={e => this.setState({password: e.target.value})} />
          {console.log("Username is ", this.state.username)}
          {console.log("Password is ", this.state.password)}
          
          <Mutation mutation={CREATE_USER} variables={{username, password}} update={(store, { data: { signup } }) =>{
            console.log('Access Token:', signup);
            this.setState({authToken: signup})
            localStorage.setItem('Authorization', this.state.authToken)
          }}>
            {parsedLink => <button onClick={parsedLink}>Create</button>}
          </Mutation>
          <br/>
          <br/>
          

        <p>Search for Boardgame</p>
          <input type="text" placeholder="Search..." value={bggSearchTerm} onChange={e => this.setState({bggSearchTerm: e.target.value})} />
          
        <Query query={SEARCHBGG} variables={{bggSearchTerm}}>
          {({ loading, error, data })=>{
            if(loading) return <div>Loading...</div>
            if(error) return <div>Error {error}</div>
            
            return <div>
              <p>{data.bgg_search_and_get.name}</p>
              <p>{data.bgg_search_and_get.description}</p>
            </div>
            
          }}
        </Query> 


          {/* <Mutation mutation={CREATE_STUDENT} variables={{name, email, password, birthDate}} update={(store, { data: { createStudent } }) =>{
            const currentStoreState = store.readQuery({query: FEED_STUDENTS});
            const newStoreState = [...currentStoreState.students, createStudent];
            store.writeQuery({
              query: FEED_STUDENTS,
              data: {students: newStoreState}
            })
          }}>
            {parsedLink => <button onClick={parsedLink}>Create</button>}
          </Mutation> */}
          {/* <Query query={FEED_STUDENTS}>
        {({ loading, error, data })=>{
          if(loading) return <div>Loading...</div>
          if(error) return <div>Error {error}</div>
          return <div>
            {data.students.map(student => <div>
              <p>{student.name}</p>
              <p>{student.email}</p>
              <p>{student.birthDate}</p>
            </div>
            )}
          </div>
        }}
        </Query> */}
      </div>
    );
  }
}

export default App;