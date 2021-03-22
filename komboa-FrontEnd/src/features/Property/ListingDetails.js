import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { idSelector } from "../Admin/adminSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../../components/Footer";
import { roleSelector } from "../Admin/adminSlice";

import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ListingDetails = () => {
  const [details, setDetails] = useState();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openLease, setOpenLease] = useState(false);
  const history = useHistory();

  const { id } = useParams();
  const userId = useSelector(idSelector);
  const role = useSelector(roleSelector);

  useEffect(() => {
    axios
      .get(`/listingdetails/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleBooking = (e) => {
    axios({
      method: "put",
      url: `/booklisting/${id}`,
      data: { id: userId },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleEndLease = () => {
    axios({
      method: "PUT",
      url: `/end-lease/${id}`,
    })
      .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };

  const handleOpenDialogue = () => {
    setOpen(true);
  };

  const handleCloseDialogue = () => {
    setOpen(false);
  };
  const handleOpenRemoveDialogue = () => {
    setOpenRemove(true);
  };
  const handleCloseRemoveDialogue = () => {
    setOpenRemove(false);
  };
  const handleOpenLeaseDialogue = () => {
    setOpenLease(true);
  };
  const handleCloseLeaseDialogue = () => {
    setOpenLease(false);
  };

  const handleDeleteProperty = () => {
    axios({
      method: "delete",
      url: `/deletelisting/${id}`,
    })
      .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };

  const handleRemoveBooking = () => {
    axios({
      method: "put",
      url: `/removebooking/${id}`,
    })
      .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      {role === "user"
        ? details && (
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
                            <h1>Listing Details</h1>
                          </div>
                          <ol className="breadcrumb">
                            <li>
                              <Link to="/">Home</Link>
                            </li>
                            <li className="active">Listing Details</li>
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
              <section
                id="property-single-gallery"
                className="property-single-gallery"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="property-single-gallery-info">
                        <div className="property--info clearfix">
                          <div className="pull-left">
                            <h5 className="property--title">
                              {details.listingType}
                            </h5>
                            <p className="property--location">
                              <i className="fa fa-map-marker"></i>Africa
                              Nairobi, Kenya
                            </p>
                          </div>
                          <div className="pull-right">
                            <span className="property--status">
                              {details.listingStatus}
                            </span>
                            <p className="property--price">
                              Ksh.{details.listingPrice || "12,000"}
                            </p>
                          </div>
                        </div>
                        {/* <!-- .property-info end --> */}
                        <div className="property--meta clearfix">
                          <div className="pull-left">
                            <ul className="list-unstyled list-inline mb-0">
                              <li>
                                Property ID:
                                <span className="value">{details._id}</span>
                              </li>
                              <li>
                                {details.bookedBy === null ? (
                                  <button
                                    className="btn"
                                    onClick={handleBooking}
                                  >
                                    <i className="fa fa-plus feature-item"></i>{" "}
                                    Book Listing
                                  </button>
                                ) : (
                                  <p>Already Booked</p>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="pull-right">
                            <div className="property--meta-share">
                              <span className="share--title">share</span>
                              <a href="#" className="twitter">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#" className="facebook">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#" className="google-plus">
                                <i className="fa fa-google-plus"></i>
                              </a>
                              <a href="#" className="pinterest">
                                <i className="fa fa-pinterest-p"></i>
                              </a>
                            </div>
                            {/* <!-- .property-meta-share end --> */}
                          </div>
                        </div>
                        {/* <!-- .property-info end --> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8">
                      <div className="property-single-carousel inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Gallery</h2>
                            </div>
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="property-single-carousel-content">
                              {/* <img src = {`data:image/jpeg;base64,${details.listingGallery[0][0].data}`} alt = 'ims'/> */}
                              <Carousel url={details.listingGallery[0]} />
                            </div>
                            {/* <!-- .col-md-12 end --> */}
                          </div>
                        </div>
                        {/* <!-- .row end --> */}
                      </div>
                      {/* <!-- .property-single-desc end --> */}
                      <div className="property-single-desc inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Description</h2>
                            </div>
                          </div>
                          {/* <!-- feature-panel #1 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/area.png"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Area:</h5>
                                <p>{details.listingArea}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #2 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/double-bed.png"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Beds:</h5>
                                <p>{details.listingBedrooms}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #3 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/washroom.jpg"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Baths:</h5>
                                <p>{details.listingBathrooms}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #4 --> */}

                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #5 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/staircase.svg"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Floor:</h5>
                                <p>{details.listingFloors}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #6 --> */}

                          {/* <!-- feature-panel end --> */}
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="property--details">
                              {details.listingDescription}
                            </div>
                            {/* <!-- .property-details end --> */}
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                        </div>
                        {/* <!-- .row end --> */}
                      </div>
                      {/* <!-- .property-single-desc end --> */}

                      <div className="property-single-features inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Features</h2>
                            </div>
                          </div>
                          {/* <!-- feature-item #1 --> */}
                          {details.listingFeatures.length <= 0 ? (
                            <p>There are no features specified</p>
                          ) : (
                            details.listingFeatures.map((feature) => {
                              return (
                                <div
                                  className="col-xs-6 col-sm-4 col-md-4"
                                  key={feature}
                                >
                                  <div className="feature-item">
                                    <p>{feature}</p>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      <div className="property-single-video inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Video</h2>
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="video--content text-center">
                              <div className="bg-section">
                                <img
                                  src="assets/images/video/1.jpg"
                                  alt="Background"
                                />
                              </div>
                              <div className="video--button">
                                <div className="video-overlay">
                                  <div className="pos-vertical-center">
                                    <a
                                      className="popup-video"
                                      href={details.listingVideo}
                                    >
                                      <i className="fa fa-youtube-play"></i>
                                    </a>
                                  </div>
                                </div>
                                {/* <!-- .video-player end --> */}
                              </div>
                            </div>
                            {/* <!-- .video-content end --> */}
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                        </div>
                        {/* <!-- .row end --> */}
                      </div>
                      {/* <!-- .property-single-video end --> */}

                      {/* <!-- .property-single-leave-review end --> */}
                    </div>
                    {/* <!-- .col-md-8 --> */}
                    <div className="col-xs-12 col-sm-12 col-md-4">
                      <div className="widget widget-featured-property">
                        <div className="widget--title">
                          <h5>Featured Properties</h5>
                        </div>
                        <div className="widget--content">
                          <div
                            className="carousel carousel-dots"
                            data-slide="1"
                            data-slide-rs="1"
                            data-autoplay="true"
                            data-nav="false"
                            data-dots="true"
                            data-space="25"
                            data-loop="true"
                            data-speed="800"
                          >
                            <div className="property-item">
                              <div className="property--content">
                                {/* <!-- .property-info end --> */}
                              </div>
                            </div>
                            {/* <!-- .property item end --> */}
                          </div>
                          {/* <!-- .carousel end --> */}
                        </div>
                      </div>
                    </div>
                    {/* <!-- .col-md-4 --> */}
                  </div>
                  {/* <!-- .row --> */}
                </div>
                {/* <!-- .container --> */}
              </section>
            </div>
          )
        : details && (
            <div
              id="wrapper"
              className="wrapper clearfix"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                            <h1>Listing Details</h1>
                          </div>
                          <ol className="breadcrumb">
                            <li>
                              <Link to="/">Home</Link>
                            </li>
                            <li className="active">Listing Details</li>
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
              <section
                id="property-single-gallery"
                className="property-single-gallery"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="property-single-gallery-info">
                        <div className="property--info clearfix">
                          <div className="pull-left">
                            <h5 className="property--title">
                              {details.listingType}
                            </h5>
                            <p className="property--location">
                              <i className="fa fa-map-marker"></i>Africa
                              Nairobi, Kenya
                            </p>
                          </div>
                          <div className="pull-right">
                            <span className="property--status">
                              {details.listingStatus}
                            </span>
                            <p className="property--price">
                              Ksh.{details.listingPrice || "12,000"}
                            </p>
                          </div>
                        </div>
                        {/* <!-- .property-info end --> */}
                        <div className="property--meta clearfix">
                          <div className="pull-left">
                            <ul className="list-unstyled list-inline mb-0">
                              <li>
                                Property ID:
                                <span className="value">{details._id}</span>
                              </li>
                              <li>
                                {details.bookedBy === null &&
                                role === "user" ? (
                                  <button
                                    className="btn"
                                    onClick={handleBooking}
                                  >
                                    <i className="fa fa-plus feature-item"></i>{" "}
                                    Book Listing
                                  </button>
                                ) : role === "user" ? (
                                  <p>Already Booked</p>
                                ) : (
                                  <p></p>
                                )}
                              </li>
                            </ul>
                          </div>
                          <div className="pull-right">
                            <div className="property--meta-share">
                              <span className="share--title">share</span>
                              <a href="#" className="twitter">
                                <i className="fa fa-twitter"></i>
                              </a>
                              <a href="#" className="facebook">
                                <i className="fa fa-facebook"></i>
                              </a>
                              <a href="#" className="google-plus">
                                <i className="fa fa-google-plus"></i>
                              </a>
                              <a href="#" className="pinterest">
                                <i className="fa fa-pinterest-p"></i>
                              </a>
                            </div>
                            {/* <!-- .property-meta-share end --> */}
                          </div>
                        </div>
                        {/* <!-- .property-info end --> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8">
                      <div className="property-single-carousel inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Gallery</h2>
                            </div>
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="property-single-carousel-content">
                              {/* <img src = {`data:image/jpeg;base64,${details.listingGallery[0][0].data}`} alt = 'ims'/> */}
                              <Carousel url={details.listingGallery[0]} />
                            </div>
                            {/* <!-- .col-md-12 end --> */}
                          </div>
                        </div>
                        {/* <!-- .row end --> */}
                      </div>
                      {/* <!-- .property-single-desc end --> */}
                      <div className="property-single-desc inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Description</h2>
                            </div>
                          </div>
                          {/* <!-- feature-panel #1 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/area.png"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Area:</h5>
                                <p>{details.listingArea}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #2 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/double-bed.png"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Beds:</h5>
                                <p>{details.listingBedrooms}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #3 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/washroom.jpg"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Baths:</h5>
                                <p>{details.listingBathrooms}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #4 --> */}

                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #5 --> */}
                          <div className="col-xs-6 col-sm-4 col-md-4">
                            <div className="feature-panel">
                              <div className="feature--img">
                                <img
                                  src={
                                    window.location.origin +
                                    "/assets/images/staircase.svg"
                                  }
                                  alt="icon"
                                  style={{
                                    maxHeight: "30px",
                                    maxWidth: "30px",
                                  }}
                                />
                              </div>
                              <div className="feature--content">
                                <h5>Floor:</h5>
                                <p>{details.listingFloors}</p>
                              </div>
                            </div>
                          </div>
                          {/* <!-- feature-panel end -->
                                <!-- feature-panel #6 --> */}

                          {/* <!-- feature-panel end --> */}
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="property--details">
                              {details.listingDescription}
                            </div>
                            {/* <!-- .property-details end --> */}
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                        </div>
                        {/* <!-- .row end --> */}
                      </div>
                      {/* <!-- .property-single-desc end --> */}

                      <div className="property-single-features inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Features</h2>
                            </div>
                          </div>
                          {/* <!-- feature-item #1 --> */}
                          {details.listingFeatures.map((feature) => {
                            return (
                              <div
                                className="col-xs-6 col-sm-4 col-md-4"
                                key={feature}
                              >
                                <div className="feature-item">
                                  <p>{feature}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {/* <!-- .row end --> */}
                      </div>

                      <div className="property-single-video inner-box">
                        <div className="row">
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="heading">
                              <h2 className="heading--title">Video</h2>
                            </div>
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                          <div className="col-xs-12 col-sm-12 col-md-12">
                            <div className="video--content text-center">
                              <div className="bg-section">
                                <img
                                  src="assets/images/video/1.jpg"
                                  alt="Background"
                                />
                              </div>
                              <div className="video--button">
                                <div className="video-overlay">
                                  <div className="pos-vertical-center">
                                    <a
                                      className="popup-video"
                                      href={details.listingVideo}
                                    >
                                      <i className="fa fa-youtube-play"></i>
                                    </a>
                                  </div>
                                </div>
                                {/* <!-- .video-player end --> */}
                              </div>
                            </div>
                            {/* <!-- .video-content end --> */}
                          </div>
                          {/* <!-- .col-md-12 end --> */}
                        </div>
                        {/* <!-- .row end --> */}
                      </div>
                      {/* <!-- .property-single-video end --> */}

                      {/* <!-- .property-single-leave-review end --> */}
                    </div>
                    {/* <!-- .col-md-8 --> */}
                    {role === "propertyOwner" ? (
                      <div className="col-xs-12 col-sm-12 col-md-4">
                        <div className="widget widget-property-agent">
                          <div className="widget--title">
                            <h5>Booked By</h5>
                            {console.log(details)}
                          </div>
                          <div className="widget--content">
                            <Link to="#">
                              <div className="agent--info">
                                <h5 className="agent--title">
                                  {details.bookedBy
                                    ? details.bookedBy.FullName
                                    : "No Bookings Made"}
                                </h5>
                              </div>
                            </Link>
                            {/* <!-- .agent-profile-details end --> */}
                            <div className="agent--contact">
                              <ul className="list-unstyled">
                                <li>
                                  <i className="fa fa-phone"></i>
                                  {details.postedBy.Contact ||
                                    "No Contact Available"}
                                </li>
                                <li>
                                  <i className="fa fa-envelope-o"></i>
                                  {details.bookedBy
                                    ? details.bookedBy.Email
                                    : "No Email Available"}
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
                        <div className="widget widget-property-agent">
                          <div className="widget--title">
                            <h5>Rented By</h5>
                          </div>
                          <div className="widget--content">
                            <Link to="#">
                              <div className="agent--info">
                                <h5 className="agent--title">
                                  {details.rentedBy !== null
                                    ? details.rentedBy.FullName
                                    : "Listing not rented Yet"}
                                </h5>
                              </div>
                            </Link>
                            {/* <!-- .agent-profile-details end --> */}
                            <div className="agent--contact">
                              <ul className="list-unstyled">
                                <li>
                                  <i className="fa fa-phone"></i>
                                  {details.postedBy.Contact ||
                                    "No Contact Available"}
                                </li>
                                <li>
                                  <i className="fa fa-envelope-o"></i>
                                  {details.rentedBy
                                    ? details.rentedBy.Email
                                    : "No Email Available"}
                                </li>
                              </ul>
                            </div>

                            {/* <!-- .agent-social-links --> */}
                          </div>
                        </div>

                        <div className="widget widget-request">
                          <div className="widget--title">
                            <h5>Manage Listing</h5>
                          </div>
                          <div className="widget--content">
                            <form className="mb-0">
                              <div className="form-group">
                                <input
                                  type="button"
                                  value="Delete Listing"
                                  name="submit"
                                  className="btn btn--primary btn--block"
                                  onClick={handleOpenDialogue}
                                />
                                <Dialog
                                  open={open}
                                  onClose={handleCloseDialogue}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {`Are you sure you want to delete this listing - ${details._id}?`}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      Deleting this listing is inreversible. Do
                                      this if you are completely sure you want
                                      to. All deleted records cannot be
                                      recovered
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={handleDeleteProperty}
                                      color="primary"
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      onClick={handleCloseDialogue}
                                      color="primary"
                                      autoFocus
                                    >
                                      Abort
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                              <div className="form-group">
                                <Link
                                  to={`/edit-listings/${id}`}
                                  className="btn btn--primary btn--block"
                                >
                                  Edit Listing
                                </Link>
                              </div>
                              {details.listingStatus === "Rent" && (
                                <div className="form-group">
                                  <Link
                                    to={`/add-billing/${id}`}
                                    className="btn btn--primary btn--block"
                                  >
                                    Add Billing
                                  </Link>
                                </div>
                              )}
                              {details.bookedBy === null ? (
                                <div className="form-group">
                                  <input
                                    type="button"
                                    value="Remove Booking"
                                    name="submit"
                                    className="btn btn--primary btn--block"
                                    onClick={handleRemoveBooking}
                                    disabled
                                  />
                                </div>
                              ) : (
                                <div className="form-group">
                                  <input
                                    type="button"
                                    value="Remove Booking"
                                    name="submit"
                                    className="btn btn--primary btn--block"
                                    onClick={handleOpenRemoveDialogue}
                                  />
                                  <Dialog
                                    open={openRemove}
                                    onClose={handleCloseRemoveDialogue}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogTitle id="alert-dialog-title">
                                      {`Are you sure you want to remove booking from this listing?`}
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Removing this booking is unreversable.
                                        Please Refresh if the booking is removed
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        onClick={handleRemoveBooking}
                                        color="primary"
                                      >
                                        Remove
                                      </Button>
                                      <Button
                                        onClick={handleCloseRemoveDialogue}
                                        color="primary"
                                        autoFocus
                                      >
                                        Abort
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                              )}
                              {details.rentedBy === null ? (
                                <div className="form-group">
                                  <input
                                    type="button"
                                    value="End Lease"
                                    name="submit"
                                    className="btn btn--primary btn--block"
                                    disabled
                                  />
                                </div>
                              ) : (
                                <div className="form-group">
                                  <input
                                    type="button"
                                    value="End Lease"
                                    name="submit"
                                    className="btn btn--primary btn--block"
                                    onClick={handleOpenLeaseDialogue}
                                  />
                                  <Dialog
                                    open={openLease}
                                    onClose={handleCloseLeaseDialogue}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogTitle id="alert-dialog-title">
                                      {`Are you sure you want to End Lease on this Listing??`}
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Removing this Leasing is unreversable.
                                        Only the tenant can lease again Please
                                        Refresh if the Leasing is removed
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        onClick={handleEndLease}
                                        color="primary"
                                      >
                                        Remove
                                      </Button>
                                      <Button
                                        onClick={handleCloseLeaseDialogue}
                                        color="primary"
                                        autoFocus
                                      >
                                        Abort
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                              )}
                              <div className="form-group">
                                <Link
                                  to={`/confirm-payment/${id}`}
                                  className="btn btn--primary btn--block"
                                >
                                  Confirm Payments
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p></p>
                    )}

                    {/* <!-- .col-md-4 --> */}
                  </div>
                  {/* <!-- .row --> */}
                </div>
                {/* <!-- .container --> */}
              </section>
            </div>
          )}
      <Footer />
    </div>
  );
};

export default ListingDetails;
