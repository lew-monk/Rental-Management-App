import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Carousel from "../../components/Carousel";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const styles = {
  width: "100%",
  height: "380px",
};

const center = {
  lat: -1.286389,
  lng: 36.817223,
};

const UserPropertiesDetails = () => {
  const [details, setDetails] = useState();
  const [select, setSelect] = useState();
  const [listings, setListings] = useState(null);
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/property/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => console.log(err.message));
    axios
      .get(`/${id}/listing`)
      .then((response) => setListings(response.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });

  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Maps is beign loaded";

  const handleOpenDialogue = () => {
    setOpen(true);
  };
  const handleCloseDialogue = () => {
    setOpen(false);
  };

  const handleDeleteProperty = () => {
    axios({
      method: "DELETE",
      url: `/deleteproperty/${id}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err.message));
    setOpen(false);
    history.push("/userproperty");
  };

  return (
    <div>
      {details ? (
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
                        <h1>Single Property</h1>
                      </div>
                      <ol className="breadcrumb">
                        <li>
                          <Link to="#">Home</Link>
                        </li>
                        <li className="active">Single Property</li>
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
                          {details.propertyName}
                        </h5>
                        <p className="property--location">
                          <i className="fa fa-map-marker"></i>Nairobi - Kenya
                        </p>
                      </div>
                      <div className="pull-right">
                        <Link to={`/${details._id}/addlisting`} className="btn">
                          <i className="fa fa-plus"></i> Add Listing
                        </Link>
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
                            Add to favorites:
                            <span className="value">
                              {" "}
                              <i className="fa fa-heart-o"></i>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="pull-right">
                        <div className="property--meta-share">
                          <span className="share--title">share</span>
                          <Link to="#" className="twitter">
                            <i className="fa fa-twitter"></i>
                          </Link>
                          <Link to="#" className="facebook">
                            <i className="fa fa-facebook"></i>
                          </Link>
                          <Link to="#" className="google-plus">
                            <i className="fa fa-google-plus"></i>
                          </Link>
                          <Link to="#" className="pinterest">
                            <i className="fa fa-pinterest-p"></i>
                          </Link>
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
                          <Carousel url={details.propertyGallery[0]} />
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

                      {/* <!-- feature-panel end --> */}
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="property--details">
                          <p>{details.propertyDescription}</p>
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
                      {details.propertyFeatures.map((feature) => {
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
                  {/* <!-- .property-single-features end --> */}

                  <div className="property-single-location inner-box">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="heading">
                          <h2 className="heading--title">Location</h2>
                        </div>
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div
                          id="googleMap"
                          style={{ width: "100%", height: "380px" }}
                        >
                          <GoogleMap
                            center={center}
                            zoom={11}
                            mapContainerStyle={styles}
                          >
                            <Marker
                              position={{
                                lat: details.propertyLocation.lat,
                                lng: details.propertyLocation.lng,
                              }}
                              onClick={(e) => {
                                console.log(e);
                                setSelect(e);
                              }}
                            >
                              {select ? (
                                <InfoWindow
                                  position={{
                                    lat: select.lat,
                                    lng: select.lang,
                                  }}
                                >
                                  <div>
                                    <p>The Property is here</p>
                                    <p>{select.time}</p>
                                  </div>
                                </InfoWindow>
                              ) : null}
                            </Marker>
                          </GoogleMap>
                        </div>
                      </div>
                      {/* <!-- .col-md-12 end --> */}
                    </div>
                    {/* <!-- .row end --> */}
                  </div>
                  {/* <!-- .property-single-location end --> */}

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
                                <Link to="#" className="popup-video" href="#">
                                  <i className="fa fa-youtube-play"></i>
                                </Link>
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

                  <div className="property-single-reviews inner-box">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="heading">
                          <h2 className="heading--title">3 Reviews</h2>
                        </div>
                      </div>
                      {/* <!-- .col-md-12 end --> */}
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <ul className="property-review">
                          <li className="review-comment">
                            <div className="avatar">R</div>
                            <div className="comment">
                              <h6>Ryan Printz</h6>
                              <div className="date">Feb 12, 2018</div>
                              <div className="property-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectet
                                adipisicing elit, sed eiusmod tempor incididun
                                ut labore dolor magna aliqua enim minim veniam,
                                quis nostrud.
                              </p>
                            </div>
                          </li>
                          {/* <!-- comment end --> */}
                          <li className="review-comment">
                            <div className="avatar">S</div>
                            <div className="comment">
                              <h6>Steve Martin</h6>
                              <div className="date">Jan 16, 2018</div>
                              <div className="property-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectet
                                adipisicing elit, sed eiusmod tempor incididun
                                ut labore dolor magna aliqua enim minim veniam,
                                quis nostrud.
                              </p>
                            </div>
                          </li>
                          {/* <!-- comment end --> */}
                          <li className="review-comment">
                            <div className="avatar">N</div>
                            <div className="comment">
                              <h6>Nicole Smith</h6>
                              <div className="date">Nov 25, 2017</div>
                              <div className="property-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectet
                                adipisicing elit, sed eiusmod tempor incididun
                                ut labore dolor magna aliqua enim minim veniam,
                                quis nostrud.
                              </p>
                            </div>
                          </li>
                          {/* <!-- comment end --> */}
                        </ul>
                        {/* <!-- .comments-list end --> */}
                      </div>
                      {/* <!-- .col-md-12 end --> */}
                    </div>
                    {/* <!-- .row end --> */}
                  </div>
                  {/* <!-- .property-single-reviews end --> */}

                  <div className="property-single-leave-review inner-box">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="heading">
                          <h2 className="heading--title">Leave Link Review</h2>
                        </div>
                      </div>
                      {/* <!-- .col-md-12 end --> */}
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <form id="post-comment" className="mb-0">
                          <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="form-group">
                                <label htmlFor="review-name">Your Name*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="review-name"
                                  id="review-name"
                                  required
                                />
                              </div>
                            </div>
                            {/* <!-- .col-md-4 end --> */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="form-group">
                                <label htmlFor="review-email">
                                  Your Email*
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="review-email"
                                  id="review-email"
                                  required
                                />
                              </div>
                            </div>
                            {/* <!-- .col-md-4 end -->
                                            <!-- .col-md-4 end --> */}
                            <div className="col-xs-12 col-sm-4 col-md-4">
                              <div className="form-group">
                                <label>Rating*</label>
                                <div className="property-rating">
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                  <i className="fa fa-star-o"></i>
                                </div>
                              </div>
                            </div>
                            {/* <!-- .col-md-4 end --> */}

                            <div className="col-xs-12 col-sm-12 col-md-12">
                              <div className="form-group">
                                <label htmlFor="review-comment">Review*</label>
                                <textarea
                                  className="form-control"
                                  id="review-comment"
                                  rows="2"
                                  required
                                ></textarea>
                              </div>
                            </div>
                            {/* <!-- .col-md-12 --> */}
                            <div className="col-xs-12 col-sm-12 col-md-12">
                              <button
                                type="submit"
                                className="btn btn--primary"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* <!-- .col-md-12 end --> */}
                    </div>
                    {/* <!-- .row end --> */}
                  </div>
                  {/* <!-- .property-single-leave-review end --> */}
                </div>
                {/* <!-- .col-md-8 --> */}
                <div className="col-xs-12 col-sm-12 col-md-4">
                  {/* <!-- widget property agent
=============================--> */}
                  <div className="widget widget-property-agent">
                    <div className="widget--title">
                      <h5>About Agent</h5>
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
                          <h5 className="agent--title">
                            {details.postedBy.FullName}
                          </h5>
                        </div>
                      </Link>
                      {/* <!-- .agent-profile-details end --> */}
                      <div className="agent--contact">
                        <ul className="list-unstyled">
                          <li>
                            <i className="fa fa-phone"></i>
                            {details.postedBy.Contact ||
                              "Please Add Your Contact"}
                          </li>
                          <li>
                            <i className="fa fa-envelope-o"></i>
                            {details.postedBy.Email || "Please Add Your Email"}
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
                  {/* <!-- . widget property agent end --> */}

                  {/* <!-- widget request
=============================--> */}
                  <div className="widget widget-request">
                    <div className="widget--title">
                      <h5>Manage Property</h5>
                    </div>
                    <div className="widget--content">
                      <form className="mb-0">
                        <div className="form-group">
                          <input
                            type="button"
                            value="Delete Property"
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
                              {`Are you sure you want to delete ${details.propertyName}?`}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Deleting this property is inreversible. Do this
                                if you are completely sure you want to. All
                                deleted records cannot be recovered
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
                            to={`/edit-property/${id}`}
                            className="btn btn--primary btn--block"
                          >
                            Edit Property
                          </Link>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            value="View Property Listings"
                            name="submit"
                            className="btn btn--primary btn--block"
                            disabled="true"
                          />
                        </div>
                        <div className="form-group">
                          <Link
                            to={`/${id}/addlisting`}
                            className="btn btn--primary btn--block"
                          >
                            Add Listing
                          </Link>
                        </div>
                        <div className="form-group">
                          <Link
                            to={`/property-report/${id}`}
                            className="btn btn--primary btn--block"
                          >
                            Property Report
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <!-- .col-md-4 --> */}
              </div>
              {/* <!-- .row --> */}
            </div>
            {/* <!-- .container --> */}
          </section>
          {listings === null ? (
            <section>
              <p>This </p>
            </section>
          ) : (
            <section
              id="properties-carousel"
              className="properties-carousel pt-0"
            >
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className="heading heading-2  mb-70">
                      <h2 className="heading--title">Property Listings</h2>
                    </div>
                    {/* <!-- .heading-title end --> */}
                  </div>
                  {/* <!-- .col-md-12 end --> */}
                </div>
                {/* <!-- .row end --> */}
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div
                      className="carousel carousel-dots owl-carousel owl-theme owl-loaded"
                      data-slide="3"
                      data-slide-rs="1"
                      data-autoplay="true"
                      data-nav="false"
                      data-dots="true"
                      data-space="25"
                      data-loop="true"
                      data-speed="800"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: "wrap",
                      }}
                    >
                      {/* <!-- .property-item #1 --> */}
                      {listings.length <= 0 ? (
                        <div>
                          <h3>No Listings at the moment</h3>
                          <Link
                            to="/addproperty"
                            className="btn"
                            style={{ fontSize: "15px" }}
                          ></Link>
                        </div>
                      ) : (
                        listings &&
                        listings.map((listing) => {
                          return (
                            <div
                              className="owl-item"
                              style={{
                                width: "296.667px",
                                marginRight: "25px",
                              }}
                              key={listing._id}
                            >
                              <div className="property-item" key={listing._id}>
                                <div className="property--img">
                                  <Link to="#">
                                    <img
                                      src={`data:image/jpeg;base64,${listing.listingGallery[0][0].data}`}
                                      alt="Listing"
                                      className="img-responsive"
                                      style={{ maxHeight: "200px" }}
                                    />
                                    <span className="property--status">
                                      {listing.listingStatus}
                                    </span>
                                  </Link>
                                </div>
                                <div className="property--content">
                                  <div className="property--info">
                                    <h5
                                      className="property--title"
                                      style={{
                                        textAlign: "center",
                                        fontSize: "24px",
                                        padding: "1.3rem",
                                      }}
                                    >
                                      <Link to={`/listing/${listing._id}`}>
                                        {listing.listingType}
                                      </Link>
                                    </h5>

                                    <p
                                      className="property--price"
                                      style={{
                                        textAlign: "center",
                                        fontSize: "18px",
                                        paddingBottom: "0.5rem",
                                      }}
                                    >
                                      Ksh. {listing.listingPrice || "12, 000"}
                                    </p>

                                    <p
                                      style={{
                                        height: "100px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {listing.listingDescription}
                                    </p>

                                    <p
                                      className="property--price"
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      <Link to={`/listing/${listing._id}`}>
                                        Read More..
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                    {/* <!-- .carousel end --> */}
                  </div>
                  {/* <!-- .col-md-12 --> */}
                </div>
                {/* <!-- .row --> */}
              </div>
              {/* <!-- .container --> */}
            </section>
          )}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default UserPropertiesDetails;
