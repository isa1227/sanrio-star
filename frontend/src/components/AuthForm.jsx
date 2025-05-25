import React from 'react';
import '../styles/auth.css';

const AuthForm = () => {
  return (
    <div className="auth-form">
      <div className="auth-toggle">
        <button className="inactive">Sign In</button>
        <button className="active">Sign Up</button>
      </div>

      <form>
        <input type="text" placeholder="Full Name" />
        <input type="password" placeholder="Password" />
        <input type="email" placeholder="Email" />

        <label className="checkbox">
          <input type="checkbox" /> I agree all statements in <a href="#">terms of service</a>
        </label>

        <button className="submit-btn">Sign Up</button>
        <p className="already">I'm already a member</p>
      </form>
    </div>
  );
};

export default AuthForm;
