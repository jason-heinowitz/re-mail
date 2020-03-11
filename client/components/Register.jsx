import React, { useState } from 'react';

const Register = (props) => {
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const attemptRegister = ({
    firstname,
    lastname,
    username,
    password,
    confirmPassword,
  }) => {
    if (firstname.length < 1) {
      console.log('First Name required.');
      return;
    }
    if (lastname.length < 1) {
      console.log('Last Name required.');
      return;
    }
    if (username.length < 1) {
      console.log('Username required.');
      return;
    }
    if (password.length < 8) {
      console.log('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      console.log('Passwords much match.');
      return;
    }

    props.register({ firstname, lastname, username, password });
  };

  return (
    <div>
      <h2>Register</h2>
      <label htmlFor="firstname">
        First Name
        <input
          id="firstname"
          name="firstname"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder='ex. "John"'
        />
      </label>
      <label htmlFor="lastname">
        Last Name
        <input
          id="lastname"
          name="lastname"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          placeholder='ex. "Smith"'
        />
      </label>
      <label htmlFor="username">
        Username
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='ex. "l33th@x0r2013"'
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="confirmpassword">
        Confirm Password
        <input
          id="confirmpassword"
          name="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button
        onClick={() => {
          attemptRegister({
            firstname: firstName,
            lastname: lastName,
            username,
            password,
            confirmPassword,
          });
        }}>
        Register
      </button>
    </div>
  );
};

export default Register;
