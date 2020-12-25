import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import config from "./config";
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    identityPoolId: "us-east-2:ae33bcdf-ddae-4773-afb9-2e8b8f1538a0",
    oauth: {
      domain: "adminbrij.auth.us-east-2.amazoncognito.com",
      scope: ["phone", "email", "openid", "profile", "aws.cognito.signin.user.admin" ],
      redirectSignIn: "http://localhost:3000/login",
      redirectSignOut: "http://localhost:3000/login",
      responseType: "code"
    }
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
