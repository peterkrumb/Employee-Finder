import React from 'react';
import axios from 'axios';

class Employees extends React.Component {
  //<--Defining the state, setting an empty array for employees and isLoading variable-->
  state = {
    users: [],
    filter: "",
    isLoading: true,
    errors: null
  };

  filterList(e){
    let filteredUsers = this.state.users;
    filteredUsers = filteredUsers.filter(item => {
      return item.toLowerCase().search(
        e.target.value.toLowerCase()
        ) !== -1;
    });

    this.setState({
      users: filteredUsers
    });
  }

  //<--Invoked immediately after a component is mounted. calls axios request getUser-->
  componentDidMount() {
    this.getUsers();
  }

  //<--Gets users from database then maps over them, grabbing only what we need (first and last name, username, email, picture)-->
  getUsers() {
    axios
      .get("https://randomuser.me/api/?results=200&nat=us")
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
     <div>
         <h2>Employee Directory</h2>
         
        <input placeholder='Search...' onChange={this.handleChange} />
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
      </div>
      
    );
  }
}

export default Employees;