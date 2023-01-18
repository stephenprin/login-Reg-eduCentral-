import React, { Component } from "react";
import { toast } from 'react-toastify';

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("https://educentral.onrender.com/api/v1/users/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
          window.localStorage.setItem("token", data.data);
          window.location.href = "/dashboard";
          this.setState({

            email: "",
            password: "",
          });

        }
      );
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            value={this.state.email}

            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

       

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
    );
  }
}
