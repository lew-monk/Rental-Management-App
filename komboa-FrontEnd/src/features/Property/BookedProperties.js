import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Carousel from "../../components/Carousel";

const Bookings = () => {
  const [details, setDetails] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const handleRenting = (param1) => {
    axios({
      method: "PUT",
      url: `/rent-listing/${param1}`,
      data: {
        id,
      },
    })
      .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };

  const handleEndLease = (param) => {
    axios({
      method: "PUT",
      url: `/end-lease/${param}`,
    })
      .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `/booked-listings/${id}`,
    })
      .then((response) => setDetails(response.data))
      .catch((err) => console.log(err.message));
  }, [id]);

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
                    <h1>Booked Listing</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="active">Booked Listing</li>
                  </ol>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {details.length === 0 ? (
          <h2>You have Made No Bookings</h2>
        ) : (
          details.map((detail) => {
            return (
              <div className="custom-property">
                <div className="property-single-gallery-info">
                  <div className="property--info clearfix">
                    <div className="pull-left">
                      <h5 className="property--title">{detail.listingType}</h5>
                      <p className="property--location">
                        <i className="fa fa-map-marker"></i>Africa Nairobi,
                        Kenya
                      </p>
                    </div>
                    <div className="pull-right">
                      <span className="property--status">
                        {detail.listingStatus}
                      </span>
                      <p className="property--price">
                        Ksh.{detail.listingPrice || "12,000"}
                      </p>
                    </div>
                  </div>

                  <div className="property--meta clearfix">
                    <div className="pull-left">
                      <ul className="list-unstyled list-inline mb-0">
                        <li>
                          Property ID:
                          <span className="value">{detail._id}</span>
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
                        <div className="col-xs-12 col-sm-12 col-md-12">
                          <div className="property-single-carousel-content">
                            <Carousel url={detail.listingGallery[0]} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="custom-btn">
                  {detail.listingStatus === "Rent" ? (
                    <div>
                      {detail.rentedBy == null ? (
                        <button
                          className="btn btn--primary"
                          onClick={() => handleRenting(detail._id)}
                        >
                          Rent Listing
                        </button>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => handleRenting(detail._id)}
                          disabled={true}
                        >
                          Listing Rented
                        </button>
                      )}
                      <Link
                        className="btn btn--block"
                        to={`/billing-info/${detail._id}`}
                        style={{ marginBottom: "1.1rem" }}
                      >
                        <button className="btn btn--primary">
                          Check Billing
                        </button>
                      </Link>
                      <Link
                        className="btn btn--block"
                        to={`/add-monthly-installment/${detail._id}`}
                        style={{ marginBottom: "1.1rem" }}
                      >
                        <button className="btn btn--primary">
                          Add Payment
                        </button>
                      </Link>

                      {detail.rentedBy != null ? (
                        <button
                          className="btn btn--primary"
                          onClick={() => handleEndLease(detail._id)}
                        >
                          End Leasing
                        </button>
                      ) : (
                        <button className="btn" disabled={true}>
                          End Leasing
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Link
                        to={`/billing-info/${detail._id}`}
                        className="btn btn--primary btn--block"
                        style={{ marginBottom: "0.7rem" }}
                      >
                        Check Billing Information
                      </Link>

                      <Link
                        to={`/buying/${detail._id}`}
                        className="btn btn--primary btn--block"
                      >
                        Add Payment (Deposit or Installment)
                      </Link>

                      <button className="btn btn--primary btn--block">
                        Claim Listing
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Bookings;
