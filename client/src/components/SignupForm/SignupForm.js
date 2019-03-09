import React, { useState,Fragment } from 'react';
import signup from '../../authUtil/signup';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
const SignupForm = props => {
  const [authErrors, setAuthErrors] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  const submitHandler = async e => {
    e.preventDefault();
    const signupProcess = await signup({
      email,
      password,
      matchPassword,
      username
    });
    const signupProcessData = await signupProcess;
    if (signupProcessData.authErrors) {
      setAuthErrors(signupProcessData.authErrors);
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setMatchPassword('');
    }
  };
  if(authErrors){
      console.log(authErrors)
  }
  return (
    <form onSubmit={e => submitHandler(e)}>
      {authErrors ? <ErrorMessage errors={authErrors} /> : <></>}
      <input
        onChange={e => setUsername(e.target.value)}
        className="input"
        value={username}
        type="text"
        placeholder="Username"
        name="username"
        required
      />
      <input
        onChange={e => setEmail(e.target.value)}
        className="input "
        value={email}
        type="email"
        placeholder="Email"
        name="email"
        required
      />
      <input
        onChange={e => setPassword(e.target.value)}
        className="input "
        value={password}
        type="password"
        placeholder="Password"
        name="password"
        required
      />
      <input
        onChange={e => setMatchPassword(e.target.value)}
        className="input "
        value={matchPassword}
        type="password"
        placeholder="Repeat your password"
        name="matchPassword"
        required
      />
      <button>Submit</button>
    </form>
  );
};
export default SignupForm;
