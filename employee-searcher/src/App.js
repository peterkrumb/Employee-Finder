import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    errors: null
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios
      .get("https://randomuser.me/api/?results=200&nat=us")
      //<--Once we get a response, map the API endpoints to our props-->
      .then(response =>
        response.data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          image: `${user.picture.thumbnail}`
        }))
      )
      //<--Loading state is used to show the user something is happening while they wait for data to load-->
      .then(users => {
        this.setState({
          users,
          isLoading: false
        });
      })
      
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <React.Fragment>
        <h2>Random User</h2>
      <div>
        {!isLoading ? (
          users.map(user => {
            const { username, name, email, image } = user;
            return (
              <div key={username}>
                <p>{name}</p>
                <div>
                  <img src={image} alt={name} />
                </div>
                <p>{email}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      </React.Fragment>
    );
  }
}

export default App;