import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style/Login.css";
import logo1 from "../images/logo-infobeans-black.svg";
import logo2 from "../images/logo-infobeans-white.svg";
import { CgMenuGridR } from "react-icons/all";
import { IconContext } from "react-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      loggedIn,
    };
    this.Change = this.Change.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  // login(e) {
  //   let errors = {};
  //   var email = document.getElementById("email");
  //   if (!email.value) {
  //     errors.email = "Email is Required";
  //   } 
  //   else if (!validateEmail(email.value)) {
  //     errors.email = "Invalid Email Syntax";
  //     email.style["border-color"] = "red";
  //   }
  //   this.setState({ errors: errors });
  // }

  Change(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    
    
    let errors = {};
    var email = document.getElementById("email");
    var pass = document.getElementById("pass");
    if (!email.value) {
      errors.email = "Email is Required";
    } 
    else if (!validateEmail(email.value)) {
      errors.email = "Invalid Email Syntax";
      email.style["border-color"] = "red";
    }
    if (!pass.value) {
      errors.pass = "Password is Required";
    } 
    
    this.setState({ errors: errors });
    const { username, password } = this.state;
    if (username === "faizee@gmail.com" && password === "Admin") {
      
      alert("suce")
      localStorage.setItem("token", "userloggedin");
      toast.success("login sucessfully");
      this.setState({
        loggedIn: true,
      });
    } else {
      toast.error("error in form");
      
    }
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/secret" />;
    }
    return (
      <div>
        <nav className="navbar fixed-top navbar-toggler" style={{}}>
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">
              <img
                src={logo2}
                alt=""
                width="128"
                height="40"
                className="d-inline-block align-text-down"
              />
              <span>Intranet Portal</span>
            </a>

            <ul class="nav justify-content-end">
              <li class="nav-item text-white">
                <IconContext.Provider
                  value={{ size: "2rem", className: "global-class-name" }}
                >
                  <CgMenuGridR />
                </IconContext.Provider>
              </li>
            </ul>
          </div>
        </nav>

        <div class="container" id="login-container">
          <div class="row  mt-5">
            <div class="card rounded-0">
              <div class="text-center pt-5 mb-2">
                <img src={logo1} alt="logo" width="100%" height="65px" />
              </div>
              <div class="card-body p-4">
                <form onSubmit={this.submitForm}>
                  <div class="mb-3">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      placeholder="Your Infobeans email address"
                      name="username"
                      value={this.state.username}
                      onChange={this.Change}
                    />
                    <label style={{ color: "red" }} class="form-text">
                      {this.state.errors && this.state.errors.email}
                    </label>
                  </div>
                  <div class="d-flex justify-content-between">
                    <label for="password" class="form-label stretch">
                      Password
                    </label>
                    <a href="#" class="forgot-link">
                      Forgot?
                    </a>
                  </div>

                  <div class="mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="pass"
                      placeholder="Your password"
                      name="password"
                      value={this.state.password}
                      onChange={this.Change}
                    />
                      <label style={{ color: "red" }} class="form-text">
                      {this.state.errors && this.state.errors.pass}
                      </label>
                  </div>
                  <div class="mt-4 mb-5">
                    <button
                      type="submit"
                      class="btn btn-danger w-100 rounded-0"
                    >
                      Login to Intranet Portal
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="footer mt-3">
              <p>© Copyright 2020 InfoBeans. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
