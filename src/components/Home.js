import React, { Fragment, Component  } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';
import { Auth } from 'aws-amplify';

export default class Home extends Component  {

  state = {
    publicmessage: null,
    adminmessage: null,
    adminoremployeemessage: null,
    userrole: null
  }

   fetchUserRole = async () => {
  //   // read all entities
    
    
   var user = await  Auth.currentAuthenticatedUser();    
   var user_role = user.signInUserSession.accessToken.payload["cognito:groups"]
     this.setState({
       userrole: user_role
   });
   }

  // fetchMessageAdminMessage = async () => {
  //   // read all entities
  //   const admin_url =  'http://localhost:8081/api/admin/message';
  //   let currentSession = await Auth.currentSession();
  //   var user = await  Auth.currentAuthenticatedUser();    
  //   let jwt = currentSession.accessToken.jwtToken;
  //   let res ='';
  //   console.log(currentSession);
  //    fetch(admin_url, {
  //     "method": "GET",
  //     "headers": {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
  //       'Authorization': `Bearer ${jwt}`
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     console.log(response);
  //     let res_message = '';
  //     if(response.error =='access_denied'){
  //       res_message = 'Access Denied';
  //     }else{
  //       res_message = response.message;
  //     }
  //     this.setState({
  //       adminmessage: res_message
  //    })
  //   })
  //    .catch(err => { 
  //      console.log(err); 
  //   });

  //   fetchMessagepublicMessage = async () => {
  //     // read all entities
  //     const admin_url =  'http://localhost:8081/api/public/message';
  //     let currentSession = await Auth.currentSession();
  //     var user = await  Auth.currentAuthenticatedUser();    
  //     let jwt = currentSession.accessToken.jwtToken;
  //     let res ='';
  //     console.log(currentSession);
  //      fetch(admin_url, {
  //       "method": "GET",
  //       "headers": {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
  //         'Authorization': `Bearer ${jwt}`
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);
  //       let res_message = '';
  //       if(response.error =='access_denied'){
  //         res_message = 'Access Denied';
  //       }else{
  //         res_message = response.message;
  //       }
  //       this.setState({
  //         publicmessage: res_message
  //      })
  //     })
  //      .catch(err => { 
  //        console.log(err); 
  //     });
  //   }
  // }


//    fetchAdminoremployeeMessage = async () => {
// //     // read all entities
//      const admin_url =  'http://localhost:8081/api/public/message';
//      let currentSession = await Auth.currentSession();
//      var user = await  Auth.currentAuthenticatedUser();    
//      let jwt = currentSession.accessToken.jwtToken;

//      console.log(currentSession);
//       fetch(admin_url, {
//        "method": "GET",
//        "headers": {
//          "Content-Type": "application/json",
//          "Accept": "application/json",
//          'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
//          'Authorization': `Bearer ${jwt}`
//        }
//      })
//      .then(response => response.json())
//      .then(response => {
//        console.log(response);
//        let res_message = '';
//        if(response.error =='access_denied'){
//          res_message = 'Access Denied';
//        }else{
//          res_message = response.message;
//        }
//        this.setState({
//          adminoremployeemessage: res_message
//       })
//      })
//       .catch(err => { console.log(err); 
//      });
   
//  }

fetchMessageAdminMessage = async () => {
  // read all entities
  
  let currentSession = await Auth.currentSession();
  let jwt = currentSession.accessToken.jwtToken;
  console.log(currentSession);
  let url ='http://localhost:8081/api/admin/message';
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
      adminmessage: res_message
   })
  })
   .catch(err => { 
     console.log(err); 
  });
}

fetchMessagepublicMessage = async () => {
  // read all entities
  
  let currentSession = await Auth.currentSession(); 
  let jwt = currentSession.accessToken.jwtToken;
  console.log(currentSession);
  let url ='http://localhost:8081/api/public/message';
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
      publicmessage: res_message
   })
  })
   .catch(err => { 
     console.log(err); 
  });
}


fetchAdminoremployeeMessage = async () => {
  // read all entities
  
  let currentSession = await Auth.currentSession(); 
  let jwt = currentSession.accessToken.jwtToken;
  console.log(currentSession);
  let url ='http://localhost:8081/api/employee/message';
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
      adminoremployeemessage: res_message
   })
  })
   .catch(err => { 
     console.log(err); 
  });
}

  componentDidMount = () => {
    this.fetchUserRole();
    this.fetchMessagepublicMessage();
    this.fetchMessageAdminMessage();
    this.fetchAdminoremployeeMessage();
    
  }
 
  render() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
        <p> {this.state.userrole}</p> 
        <p> Your public message : {this.state.publicmessage}</p>    
        <p> Your admin message : {this.state.adminmessage}</p>    
        <p> Your admin or employee message : {this.state.adminoremployeemessage}</p>    
          {/* <span className="tag is-primary">New</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
  }
}
