import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {

  state = {
  //  message: null,
    name : ''
  }

  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    }catch(error) {
      console.log(error.message);
    }
  }

  fetchMessage = async () => {
    // read all entities
    
    let currentSession = await Auth.currentSession();
    var user = await  Auth.currentAuthenticatedUser();  
    let name = '';
    if(user.attributes == undefined){
      name = currentSession.idToken.payload.name;
    }else {
      name = user.attributes.name;
    }

    this.setState({
      name: name
   })
    let jwt = currentSession.accessToken.jwtToken;
    console.log(currentSession);
    let url ='http://localhost:8081/api/public/message';
    var user_role = user.signInUserSession.accessToken.payload["cognito:groups"]
    if(user_role==='ROLE_ADMIN'){
      url ='http://localhost:8081/api/admin/message';
    } else if(user_role==='ROLE_EMPLOYEE'){
      url ='http://localhost:8081/api/employee/message';
    //  url ='http://localhost:8081/api/admin/message';
    }

    fetch(url, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
        'Authorization': `Bearer ${jwt}`
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      let res_message = '';
      if(response.error ==='access_denied'){
        res_message = 'Access Denied';
      }else{
        res_message = response.message;
      }
      this.setState({
        message: res_message
     })
    })
     .catch(err => { 
       console.log(err); 
    });
  }

  componentDidMount = () => {
    this.fetchMessage();
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="nexogic.png" width="112" height="28" alt="Nexogic logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <div>
                  <p>
                  Hello {this.state.name}</p>
                                  
                </div>                  
              
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log out
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
