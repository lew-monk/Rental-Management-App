import { Link } from "react-router-dom";
import { userSelector } from "../features/Admin/adminSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FileInput } from "../components/DropZone/DropzoneComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const UserProfile = () => {
  const [details, setDetails] = useState(null);
  const user = useSelector(userSelector);

  const schema = yup.object().shape({
    email: yup.string().email("Please Provide a valid Email Address"),
    contact: yup
      .string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password should Contain atleast: 8 characters and 1 uppercase letter"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Dont Match"),
  });

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: "put",
      url: `/updateAdmin/${details.userId}`,
      data: data,
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    setDetails(user);
  }, [user]);

  return (
    <div id="wrapper" className="wrapper clearfix">
      <section
        id="page-title"
        className="page-title bg-overlay bg-overlay-dark2 bg-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
              <div className="title title-1 text-center">
                <div className="title--content">
                  <div className="title--heading">
                    <h1>user Profile</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="active">user Profile</li>
                  </ol>
                </div>
                <div className="clearfix"></div>
              </div>
              {/* <!-- .title end --> */}
            </div>
            {/* <!-- .col-md-12 end --> */}
          </div>
          {/* <!-- .row end --> */}
        </div>
        {/* <!-- .container end --> */}
      </section>
      <section id="user-profile" className="user-profile">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">
              {details && (
                <div className="widget widget-property-agent">
                  <div className="widget--title">
                    <h5>My Profile</h5>
                  </div>
                  <div className="widget--content">
                    <Link to="#">
                      <div className="agent--img">
                        <img
                          src="assets/images/agents/grid/7.jpg"
                          alt="agent"
                          className="img-responsive"
                        />
                      </div>
                      <div className="agent--info">
                        <h5 className="agent--title">{details.userName}</h5>
                      </div>
                    </Link>
                    {/* <!-- .agent-profile-details end --> */}
                    <div className="agent--contact">
                      <ul className="list-unstyled">
                        <li>
                          <i className="fa fa-phone"></i>
                          {details.Contact || "Add Phone number"}
                        </li>
                        <li>
                          <i className="fa fa-envelope-o"></i>
                          {details.userEmail || null}
                        </li>
                      </ul>
                    </div>
                    {/* <!-- .agent-contact end --> */}
                    <div className="agent--social-links">
                      <Link to="#">
                        <i className="fa fa-facebook"></i>
                      </Link>
                      <Link to="#">
                        <i className="fa fa-twitter"></i>
                      </Link>
                      <Link to="#">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                      <Link to="#">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </div>
                    {/* <!-- .agent-social-links --> */}
                  </div>
                </div>
              )}
            </div>

            {/* <!-- .col-md-4 --> */}
            <div className="col-xs-12 col-sm-12 col-md-8">
              <form className="mb-0" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-box">
                  <h4 className="form--title">Update Profile Picture</h4>
                  <div className="upload--img-area">
                    <FileInput control={control} name="files" />
                  </div>
                </div>
                {details && (
                  <div className="form-box">
                    <h4 className="form--title">
                      Update or Edit Personal Details
                    </h4>
                    <div className="form-group">
                      <label htmlFor="first-name">Full name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        id="first-name"
                        defaultValue={details.userName}
                        ref={register}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email-address">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email-address"
                        defaultValue={details.userEmail}
                        ref={register}
                      />
                      {errors.email && errors.email.message}
                    </div>
                    {/* <!-- .form-group end --> */}
                    <div className="form-group">
                      <label htmlFor="phone-number">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        id="phone-number"
                        defaultValue={details.Contact}
                        ref={register}
                      />
                    </div>
                  </div>
                )}
                {/* <!-- .form-box end --> */}
                <div className="form-box">
                  <h4 className="form--title">Change Password</h4>
                  <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      ref={register}
                      required={false}
                    />
                    {errors.password && errors.password.message}
                  </div>
                  {/* <!-- .form-group end --> */}
                  <div className="form-group">
                    <label htmlFor="confirm-password">confirm password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      id="confirm-password"
                      ref={register}
                    />
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </div>
                  {/* <!-- .form-group end --> */}
                </div>
                {/* <!-- .form-box end --> */}
                <input
                  type="submit"
                  value="Save Edits"
                  name="submit"
                  className="btn btn--primary"
                />
              </form>
            </div>
            {/* <!-- .col-md-8 end --> */}
          </div>
          {/* <!-- .row end --> */}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
