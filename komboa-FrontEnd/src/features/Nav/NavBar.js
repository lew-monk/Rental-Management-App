import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../Admin/adminSlice";
import { authSelector, roleSelector, idSelector } from "../Admin/adminSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const NavBar = () => {
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const roles = useSelector(roleSelector);
  const id = useSelector(idSelector);

  const schema = yup.object().shape({
    loginEmail: yup.string().email().required(),
    loginPassword: yup.string().required(),
  });

  const schema2 = yup.object().shape({
    registerEmail: yup.string().email().required(),
    registerPassword: yup
      .string()
      .required()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password should Contain atleast: 8 characters and 1 uppercase letter"
      ),
    fullName: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm({
    resolver: yupResolver(schema2),
  });

  const onSignup = (data) => {
    axios
      .post("/register2", data)
      .then((response) => {
        console.log(response);
        if (response.data.auth === true) {
          dispatch(signUp(response.data));
          document
            .querySelector("#signupModule")
            .setAttribute("style", "display: none");
        } else {
        }

        // history.push("/");
      })
      .catch((err) => console.log(err.message));
  };
  const onLogin = (data) => {
    axios
      .post("/login", data)
      .then((response) => {
        if (response.data.auth === true) {
          document
            .querySelector("#signupModule")
            .setAttribute("style", "display: none");
          dispatch(logIn(response.data));
        } else {
          console.log(response);
          return (errors.loginEmail = true);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("scroll", () => handleScroll);
    });
    setRole(roles);
  }, [roles]);

  const handleScroll = () => {
    const nav = document.querySelector("#primary-menu");

    if (window.scrollY > 15) {
      nav.classList.add("affix");
    } else {
      nav.classList.remove("affix");
    }
  };

  return (
    <header
      id="navbar-spy"
      className="header header-1 header-transparent header-fixed"
      style={{ position: "absolute" }}
    >
      {auth ? (
        role && role === "propertyOwner" ? (
          <nav
            id="primary-menu"
            className="navbar navbar-fixed-top nav-background"
          >
            <div className="container-fluid nav-background">
              {/* <!-- Brand and toggle get grouped for better mobile display --> */}
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="logo" to="/">
                  <img
                    className="logo-dark"
                    src="/assets/images/logo/logo-dark.png"
                    alt="Land Logo"
                  />
                </Link>
              </div>

              {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
              <div
                className="collapse navbar-collapse pull-right"
                id="navbar-collapse-1"
              >
                <ul className="nav navbar-nav nav-pos-center navbar-left">
                  {/* <!-- Home Menu --> */}
                  <li className="has-dropdown active">
                    <Link
                      to="/"
                      className="dropdown-toggle menu-item colText"
                      data-toggle="dropdown"
                    >
                      home
                    </Link>
                  </li>

                  <li className="has-dropdown">
                    <Link
                      to="#"
                      className="dropdown-toggle menu-item"
                      data-toggle="dropdown"
                    >
                      Profile
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/userprofile">user profile</Link>
                      </li>
                      <li>
                        <Link to="/userproperty">my properties</Link>
                      </li>

                      {role === "propertyOwner" && (
                        <li>
                          <Link to="/addproperty">add property</Link>
                        </li>
                      )}
                    </ul>
                  </li>

                  <li className="has-dropdown">
                    <Link
                      to="#"
                      className="dropdown-toggle menu-item"
                      data-toggle="dropdown"
                    >
                      Properties
                    </Link>
                    <ul className="dropdown-menu">
                      <li className="dropdown-submenu">
                        {/* <a href="#" data-toggle="dropdown" className="dropdown-toggle">properties list</a> */}
                        <Link to="/propertylist" className="dropdown-toggle">
                          Property list
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* <!-- Module Signup  --> */}
                <div className="module module-login pull-left">
                  <Link className="btn-popup" to="/logout">
                    LogOut
                  </Link>
                  <div
                    className="modal register-login-modal fade"
                    tabIndex="-1"
                    role="dialog"
                    id="signupModule"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="row">
                            {/* <!-- Tab panes --> */}
                            <div className="tab-content">
                              <div
                                className="tab-pane fade in active"
                                id="login"
                              >
                                <div className="signup-form-container text-center">
                                  {/* <!-- form  end --> */}
                                </div>
                                {/* <!-- .signup-form end --> */}
                              </div>
                              <div className="tab-pane" id="signup">
                                {/* <!-- form  end --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- /.modal-content --> */}
                      </div>
                      {/* <!-- /.modal-dialog --> */}
                    </div>
                    {/* <!-- /.modal --> */}
                  </div>
                </div>
                {/* <!-- Module Consultation  --> */}
                <div className="module module-property pull-left">
                  <Link to="/addproperty" className="btn">
                    <i className="fa fa-plus"></i> add property
                  </Link>
                </div>
              </div>
              {/* <!-- /.navbar-collapse --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </nav>
        ) : (
          <nav
            id="primary-menu"
            className="navbar navbar-fixed-top nav-background"
          >
            <div className="container-fluid nav-background">
              {/* <!-- Brand and toggle get grouped for better mobile display --> */}
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link className="logo" to="/">
                  <img
                    className="logo-dark"
                    src="/assets/images/logo/logo-dark.png"
                    alt="Land Logo"
                  />
                </Link>
              </div>

              {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
              <div
                className="collapse navbar-collapse pull-right"
                id="navbar-collapse-1"
              >
                <ul className="nav navbar-nav nav-pos-center navbar-left">
                  {/* <!-- Home Menu --> */}
                  <li className="has-dropdown active">
                    <Link
                      to="/"
                      className="dropdown-toggle menu-item colText"
                      data-toggle="dropdown"
                    >
                      home
                    </Link>
                  </li>
                  {/* <!-- li end -->


                  {/* <!-- Profile Menu-->  */}
                  <li className="has-dropdown">
                    <Link
                      to="#"
                      className="dropdown-toggle menu-item"
                      data-toggle="dropdown"
                    >
                      Profile
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/userprofile">user profile</Link>
                      </li>
                      {role === "propertyOwner" && (
                        <li>
                          <Link to="/userproperty">my properties</Link>
                        </li>
                      )}
                      <li>
                        <Link to={`/bookings/${id}`}>Booked Properties</Link>
                      </li>
                    </ul>
                  </li>
                  {/* <!-- li end -->

                    <!-- Properties Menu--> */}
                  <li>
                    <Link to="/propertylist">Properties</Link>
                    {/* <ul className="dropdown-menu">
                      <li className="dropdown-submenu">
                        <Link to="/propertylist" className="dropdown-toggle">
                          Property list
                        </Link>
                      </li>
                    </ul> */}
                  </li>
                  {/* <!-- li end --> */}

                  {/* <li><a href="page-contact.html">contact</a></li> */}
                </ul>
                {/* <!-- Module Signup  --> */}
                <div className="module module-login pull-left">
                  <div className="module module-property pull-left">
                    <Link to="/logout" className="btn">
                      <i className="fa fa-plus"></i> LogOut
                    </Link>
                  </div>
                  <div
                    className="modal register-login-modal fade"
                    tabIndex="-1"
                    role="dialog"
                    id="signupModule"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="row">
                            <div className="tab-content">
                              <div
                                className="tab-pane fade in active"
                                id="login"
                              >
                                <div className="signup-form-container text-center">
                                  {/* <!-- form  end --> */}
                                </div>
                                {/* <!-- .signup-form end --> */}
                              </div>
                              <div className="tab-pane" id="signup">
                                {/* <!-- form  end --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- /.modal-content --> */}
                      </div>
                      {/* <!-- /.modal-dialog --> */}
                    </div>
                    {/* <!-- /.modal --> */}
                  </div>
                </div>
                {/* <!-- Module Consultation  --> */}
              </div>
              {/* <!-- /.navbar-collapse --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </nav>
        )
      ) : (
        <nav
          id="primary-menu"
          className="navbar navbar-fixed-top nav-background"
        >
          <div className="container-fluid nav-background">
            {/* <!-- Brand and toggle get grouped for better mobile display --> */}
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="logo" to="/">
                <img
                  className="logo-dark"
                  src="/assets/images/logo/logo-dark.png"
                  alt="Land Logo"
                />
              </Link>
            </div>

            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div
              className="collapse navbar-collapse pull-right"
              id="navbar-collapse-1"
            >
              <ul className="nav navbar-nav nav-pos-center navbar-left">
                {/* <!-- Home Menu --> */}
                <li className="has-dropdown active">
                  <Link
                    to="#"
                    className="dropdown-toggle menu-item colText"
                    data-toggle="dropdown"
                  >
                    home
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="index.html">home search</a>
                    </li>
                    <li>
                      <a href="home-map.html">home map</a>
                    </li>
                  </ul>
                </li>

                <li className="has-dropdown">
                  <Link to="/propertylist">Properties</Link>
                </li>
              </ul>
              {/* <!-- Module Signup  --> */}
              <div className="module module-login pull-left">
                <div
                  className="modal register-login-modal fade"
                  tabIndex="-1"
                  role="dialog"
                  id="signupModule"
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="row">
                          {/* <!-- Nav tabs --> */}
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a href="#login" data-toggle="tab">
                                login
                              </a>
                            </li>
                            <li>
                              <a href="#signup" data-toggle="tab">
                                signup
                              </a>
                            </li>
                          </ul>
                          {/* <!-- Tab panes --> */}
                          <div className="tab-content">
                            <div className="tab-pane fade in active" id="login">
                              <div className="signup-form-container text-center">
                                <form
                                  className="mb-0"
                                  onSubmit={handleSubmit(onLogin)}
                                >
                                  <div className="or-text">
                                    <span></span>
                                  </div>
                                  <div className="form-group">
                                    <input
                                      type="email"
                                      className="form-control"
                                      name="loginEmail"
                                      placeholder="Email Address"
                                      ref={register}
                                    />
                                    {errors.loginEmail && "Use Email"}
                                  </div>
                                  {/* <!-- .form-group end --> */}
                                  <div className="form-group">
                                    <input
                                      type="password"
                                      className="form-control"
                                      name="loginPassword"
                                      id="login-password"
                                      placeholder="Password"
                                      ref={register}
                                    />
                                  </div>
                                  {/* <!-- .form-group end --> */}
                                  <div className="input-checkbox">
                                    <label className="label-checkbox">
                                      <span>Remember Me</span>
                                      <input type="checkbox" ref={register} />
                                      <span className="check-indicator"></span>
                                    </label>
                                  </div>
                                  <input
                                    type="submit"
                                    className="btn btn--primary btn--block"
                                    value="Sign In"
                                  />
                                  {/* <Link to="#" className="forget-password">
                                    Forget your password?
                                  </Link> */}
                                </form>
                                {/* <!-- form  end --> */}
                              </div>
                              {/* <!-- .signup-form end --> */}
                            </div>
                            <div className="tab-pane" id="signup">
                              <form
                                className="mb-0"
                                onSubmit={handleSubmit2(onSignup)}
                              >
                                <div className="or-text">
                                  <span></span>
                                </div>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="full-name"
                                    placeholder="Full Name"
                                    ref={register2}
                                  />
                                  {errors2.fullName && (
                                    <p>Please enter your Full Name</p>
                                  )}
                                </div>
                                {/* <!-- .form-group end --> */}
                                <div className="form-group">
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="registerEmail"
                                    id="register-email"
                                    placeholder="Email Address"
                                    ref={register2}
                                  />
                                  {errors2.registerEmail && (
                                    <p>Please enter a valid email</p>
                                  )}
                                </div>
                                <div className="form-group">
                                  <select
                                    placeholder="What Client are you?"
                                    name="Role"
                                    ref={register2}
                                  >
                                    <option disabled selected>
                                      What Client are you?
                                    </option>
                                    <option value="propertyOwner">
                                      Property Owner
                                    </option>
                                    <option value="user">User</option>
                                  </select>
                                </div>
                                {/* <!-- .form-group end --> */}
                                <div className="form-group">
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="registerPassword"
                                    id="register-password"
                                    placeholder="Password"
                                    ref={register2}
                                  />
                                  {errors2.registerPassword && (
                                    <p style={{ fontSize: "12px" }}>
                                      - Password should at least have 8
                                      characters <br />- must contain at least 1
                                      uppercase letter, 1 lowercase letter, and
                                      1 number <br />- Can contain special
                                      characters
                                    </p>
                                  )}
                                </div>
                                {/* <!-- .form-group end --> */}

                                <input
                                  type="submit"
                                  className="btn btn--primary btn--block"
                                  value="Register"
                                />
                              </form>
                              {/* <!-- form  end --> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- /.modal-content --> */}
                    </div>
                    {/* <!-- /.modal-dialog --> */}
                  </div>
                  {/* <!-- /.modal --> */}
                </div>
              </div>
              {/* <!-- Module Consultation  --> */}
              <div className="module module-property pull-left">
                <Link
                  className="btn "
                  data-toggle="modal"
                  data-target="#signupModule"
                >
                  <i className="fa fa-plus"></i> LogIn
                </Link>
              </div>
            </div>
            {/* <!-- /.navbar-collapse --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </nav>
      )}
    </header>
  );
};

export default NavBar;
