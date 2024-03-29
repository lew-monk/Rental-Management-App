import NavBar from "../Nav/NavBar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import Type from "../../variables/Type";
import { useForm } from "react-hook-form";
import axios from "axios";

const LandingPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios({
      method: "POST",
      url: "/findproperty",
      data: data,
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div id="wrapper" className="wrapper clearfix">
        {/* <NavBar /> */}
        <section id="heroSearch" className="hero-search mtop-100 pt-0 pb-0">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="slider--content">
                  <div className="text-center">
                    <h1>Find Your Favorite Property</h1>
                  </div>
                  <form className="mb-0" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-box search-properties">
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="form-group">
                            <div className="select--box">
                              <input
                                className="form-control"
                                name="name"
                                ref={register}
                                placeholder="Property Name"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="form-group">
                            <div className="select--box">
                              <i className="fa fa-angle-down"></i>
                              <select
                                name="type"
                                id="select-type"
                                ref={register}
                                defaultValue={null}
                              >
                                <option value>Type OF Property </option>
                                {Type.map((type) => {
                                  return (
                                    <option value={type} key={type}>
                                      {type}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <div className="form-group">
                            <div className="select--box">
                              <i className="fa fa-angle-down"></i>
                              <select
                                name="status"
                                id="select-status"
                                ref={register}
                                defaultChecked={null}
                              >
                                <option value="">Any Status</option>
                                <option value="Rent">For Rent</option>
                                <option value="Sale">For Sale</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div className="col-xs-12 col-sm-6 col-md-3">
                          <input
                            type="submit"
                            value="Search"
                            name="submit"
                            className="btn btn--primary btn--block"
                          />
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div
                          className="col-xs-12 col-sm-6 col-md-3 option-hide"
                          style={{ display: "none" }}
                        >
                          <div className="form-group">
                            <div className="select--box">
                              <i className="fa fa-angle-down"></i>
                              <select name="select-beds" id="select-beds">
                                <option>Beds</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div
                          className="col-xs-12 col-sm-6 col-md-3 option-hide"
                          style={{ display: "none" }}
                        >
                          <div className="form-group">
                            <div className="select--box">
                              <i className="fa fa-angle-down"></i>
                              <select name="select-baths" id="select-baths">
                                <option>Baths</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div
                          className="col-xs-12 col-sm-6 col-md-6 option-hide"
                          style={{ display: "none" }}
                        >
                          <div className="filter mb-30">
                            <p>
                              <label htmlFor="amount">Price Range: </label>
                              <input
                                id="amount"
                                type="text"
                                className="amount"
                                readOnly
                              />
                            </p>
                            <div className="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
                              <div
                                id="range"
                                className="ui-slider-range ui-widget-header ui-corner-all"
                                style={{ left: "0%", width: "100%" }}
                              >
                                <span
                                  id="range1"
                                  className="ui-slider-handle ui-state-default ui-corner-all"
                                  tabIndex="0"
                                  style={{ left: "0%" }}
                                ></span>
                                <span
                                  className="ui-slider-handle ui-state-default ui-corner-all"
                                  tabIndex="0"
                                  style={{ left: "100%" }}
                                ></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- .col-md-3 end --> */}
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <Link to="#" id="options" className="less--options">
                            More options
                          </Link>
                        </div>
                      </div>
                      {/* <!-- .row end --> */}
                    </div>
                    {/* <!-- .form-box end --> */}
                  </form>
                </div>
              </div>
              {/* <!-- .container  end --> */}
            </div>
            {/* <!-- .slider-text end --> */}
          </div>
          <div
            className="carousel slider-navs"
            data-slide="1"
            data-slide-rs="1"
            data-autoplay="true"
            data-nav="true"
            data-dots="false"
            data-space="0"
            data-loop="true"
            data-speed="800"
          >
            {/* <!-- Slide #1 --> */}
            <div className="slide--item bg-overlay bg-overlay-dark3">
              <div className="bg-section">
                <img
                  src="assets/images/jason-dent-w3eFhqXjkZE-unsplash.jpg"
                  alt="background"
                />
              </div>
            </div>
            {/* <!-- .slide-item end -->
                <!-- Slide #2 --> */}
            <div className="slide--item bg-overlay bg-overlay-dark3">
              <div className="bg-section">
                <img
                  src="assets/images/slider/slide-bg/1.jpg"
                  alt="background"
                />
              </div>
            </div>
            {/* <!-- .slide-item end -->
                <!-- Slide #3 --> */}
            <div className="slide--item bg-overlay bg-overlay-dark3">
              <div className="bg-section">
                <img
                  src="assets/images/slider/slide-bg/3.jpg"
                  alt="background"
                />
              </div>
            </div>
            {/* <!-- .slide-item end --> */}
          </div>
        </section>
        <section
          id="feature"
          className="feature feature-1 text-center bg-white pb-90"
        >
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="heading heading-2 text-center mb-70">
                  <h2 className="heading--title">Simple Steps</h2>
                  <p className="heading--desc">
                    Duis aute irure dolor in reprehed in volupted velit esse
                    dolore
                  </p>
                </div>
                {/* <!-- .heading-title end --> */}
              </div>
              {/* <!-- .col-md-12 end --> */}
            </div>
            {/* <!-- .row end --> */}
            <div className="row">
              {/* <!-- feature Panel #1 --> */}
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="feature-panel">
                  <div className="feature--icon">
                    <img
                      src="assets/images/features/icons/5.png"
                      alt="icon img"
                    />
                  </div>
                  <div className="feature--content">
                    <h3>Search For Real Estates</h3>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eule pariate.
                    </p>
                  </div>
                </div>
                {/* <!-- .feature-panel end --> */}
              </div>
              {/* <!-- .col-md-4 end -->
                    <!-- feature Panel #2 --> */}
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="feature-panel">
                  <div className="feature--icon">
                    <img
                      src="assets/images/features/icons/6.png"
                      alt="icon img"
                    />
                  </div>
                  <div className="feature--content">
                    <h3>Select Your Favorite</h3>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eule pariate.
                    </p>
                  </div>
                </div>
                {/* <!-- .feature-panel end --> */}
              </div>
              {/* <!-- .col-md-4 end -->
                    <!-- feature Panel #3 --> */}
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="feature-panel">
                  <div className="feature--icon">
                    <img
                      src="assets/images/features/icons/7.png"
                      alt="icon img"
                    />
                  </div>
                  <div className="feature--content">
                    <h3>Take Your Key</h3>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eule pariate.
                    </p>
                  </div>
                </div>
                {/* <!-- .feature-panel end --> */}
              </div>
              {/* <!-- .col-md-4 end --> */}
            </div>
            {/* <!-- .row end --> */}
          </div>
          {/* <!-- .container end --> */}
        </section>
        <section id="city-property" className="city-property text-center pb-70">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="heading heading-2 text-center mb-70">
                  <h2 className="heading--title">Property By City</h2>
                  <p className="heading--desc">
                    Duis aute irure dolor in reprehed in volupted velit esse
                    dolore
                  </p>
                </div>
                {/* <!-- .heading-title end --> */}
              </div>
              {/* <!-- .col-md-12 end --> */}
            </div>
            {/* <!-- .row end --> */}
            <div className="row">
              {/* <!-- City #1 --> */}
              <div className="col-xs-12 col-sm-8 col-md-8">
                <div className="property-city-item">
                  <div className="property--city-img">
                    <Link to="#">
                      <img
                        src="assets/images/properties/city/1.jpg"
                        alt="city"
                        className="img-responsive"
                      />
                      <div className="property--city-overlay">
                        <div className="property--item-content">
                          <h5 className="property--title">New York</h5>
                          <p className="property--numbers">16 Properties</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <!-- .property-city-img end --> */}
                </div>
                {/* <!-- . property-city-item end --> */}
              </div>
              {/* <!-- .col-md-8 end -->
                    <!-- City #2 --> */}
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="property-city-item">
                  <div className="property--city-img">
                    <Link to="#">
                      <img
                        src="assets/images/properties/city/2.jpg"
                        alt="city"
                        className="img-responsive"
                      />
                      <div className="property--city-overlay">
                        <div className="property--item-content">
                          <h5 className="property--title">Chicago</h5>
                          <p className="property--numbers">14 Properties</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <!-- .property-city-img end --> */}
                </div>
                {/* <!-- . property-city-item end --> */}
              </div>
              {/* <!-- .col-md-8 end --> */}
            </div>
            {/* <!-- .row end --> */}
            <div className="row">
              {/* <!-- City #3 --> */}
              <div className="col-xs-12 col-sm-4 col-md-4">
                <div className="property-city-item">
                  <div className="property--city-img">
                    <Link to="#">
                      <img
                        src="assets/images/properties/city/3.jpg"
                        alt="city"
                        className="img-responsive"
                      />
                      <div className="property--city-overlay">
                        <div className="property--item-content">
                          <h5 className="property--title">Manhatten</h5>
                          <p className="property--numbers">18 Properties</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <!-- .property-city-img end --> */}
                </div>
                {/* <!-- . property-city-item end --> */}
              </div>
              {/* <!-- .col-md-8 end -->
                    <!-- City #4 --> */}
              <div className="col-xs-12 col-sm-8 col-md-8">
                <div className="property-city-item">
                  <div className="property--city-img">
                    <Link to="#">
                      <img
                        src="assets/images/properties/city/4.jpg"
                        alt="city"
                        className="img-responsive"
                      />
                      <div className="property--city-overlay">
                        <div className="property--item-content">
                          <h5 className="property--title">Los Angeles</h5>
                          <p className="property--numbers">10 Properties</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* <!-- .property-city-img end --> */}
                </div>
                {/* <!-- . property-city-item end --> */}
              </div>
              {/* <!-- .col-md-8 end --> */}
            </div>
            {/* <!-- .row end --> */}
          </div>
          {/* <!-- .container end --> */}
        </section>

        <Footer />

        {/* <Helmet>
                    <script src="../../../public/assets/js/jquery-2.2.4.min.js"></script>
                    <script src="../../../public/assets/js/plugins.js"></script>
                    <script src="../../../public/assets/js/functions.js"></script>
                    <script src="../../../public/assets/js/less.js"></script>
                    <script src="../../../public/assets/js/respond.min.js"></script>
                </Helmet> */}
      </div>
    </div>
  );
};

export default LandingPage;
