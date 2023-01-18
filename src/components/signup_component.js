import React, { Component } from "react";
import { toast } from "react-toastify";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone:"",
      password: "",
      confirmPassword: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { name, phone, email, password } = this.state;
    console.log(name, phone, email, password);
    fetch("https://educentral.onrender.com/api/v1/users/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        confirmPassword: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message)
        this.setState({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",

        })
      });
   
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            className="form-control"
            placeholder="Name"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) => this.setState({ phone: e.target.value })}
          />
        </div>

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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" name="confirmPassword" value={this.state.confirmPassword}
            className="form-control" placeholder="Confirm password" onChange={(e) => this.setState({ confirmPassword: e.target.value })} />

        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
