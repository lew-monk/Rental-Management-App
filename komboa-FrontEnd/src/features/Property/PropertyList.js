import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Counties from "../../variables/Counties";
import { useEffect, useState } from "react";
import { fetchProperty, imageSelector } from "../Property/PropertySlice2";
import { useDispatch, useSelector } from "react-redux";
import Type from "../../variables/Type";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Loading from "../../components/Loading";

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const PropertyList = () => {
  const [propertyInfo] = useState([]);
  const [markers, setMarkers] = useState(null);
  const dispatch = useDispatch();
  const image = useSelector(imageSelector);

  useEffect(() => {
    dispatch(fetchProperty());
    const entries = Object.entries(image);
    for (const [choose, count] of entries) {
      propertyInfo.push(count);
    }
  }, [propertyInfo]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  if (loadError) return "Error Loading maps";
  if (!isLoaded) return <Loading />;

  const center = {
    lat: -1.286389,
    lng: 36.817223,
  };

  return (
    <div id="wrapper" className="wrapper clearfix">
      <section id="map" className="hero-map pt-0 pb-0">
        <div className="container-fluid pr-0 pl-0">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <div id="googleMap">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={center}
                  zoom={8}
                  options={{ disableDefaultUI: true, zoomControl: true }}
                >
                  {propertyInfo.map((location) => {
                    return (
                      <Marker
                        key={location._id}
                        position={{
                          lat: location.propertyLocation.lat,
                          lng: location.propertyLocation.lng,
                        }}
                        onClick={(e) => {
                          setMarkers(e);
                        }}
                      >
                        {markers && (
                          <InfoWindow
                            position={{ lat: markers.lat, lng: markers.lng }}
                            onCloseClick={() => setMarkers(null)}
                          >
                            <h5>{location.propertyName}</h5>
                          </InfoWindow>
                        )}
                      </Marker>
                    );
                  })}
                </GoogleMap>
              </div>
            </div>
            {/* <!-- .col-md-12 end --> */}
          </div>
          {/* <!-- .row end --> */}
        </div>
        {/* <!-- .container end --> */}
        <div className="search-properties">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <form className="mb-0 ">
                  <div className="form-box ">
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="form-group">
                          <div className="select--box">
                            <i className="fa fa-angle-down"></i>
                            <select name="select-location" id="select-location">
                              {Counties.map((county) => {
                                return (
                                  <option key={county} value={county}>
                                    {county}
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
                            <select name="select-type" id="select-type">
                              {Type.map((category) => {
                                return (
                                  <option key={category} value={category}>
                                    {category}
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
                            <select name="select-status" id="select-status">
                              <option>Any Status</option>
                              <option>For Rent</option>
                              <option>For Sale</option>
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
                          className="btn btn--primary btn--block mb-30"
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
                          <div className="slider-range"></div>
                        </div>
                      </div>
                      {/* <!-- .col-md-3 end --> */}
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <Link
                          to="#"
                          id="options"
                          className="less--options active"
                        >
                          Less options
                        </Link>
                      </div>
                    </div>
                    {/* <!-- .row end --> */}
                  </div>
                  {/* <!-- .form-box end --> */}
                </form>
              </div>
              {/* <!-- .col-md-12 end --> */}
            </div>
            {/* <!-- .row end --> */}
          </div>
          {/* <!-- .container end --> */}
        </div>
      </section>
      <section id="properties-list">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">
              {/* <!-- widget property type
=============================--> */}
              <div className="widget widget-property">
                <div className="widget--title">
                  <h5>Property Type</h5>
                </div>
                <div className="widget--content">
                  <ul className="list-unstyled mb-0">
                    {Type.map((category) => {
                      return (
                        <li key={category}>
                          <Link to="#">
                            {category} <span>(13)</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* <!-- . widget property type end -->

                        <!-- widget property status
=============================--> */}
              <div className="widget widget-property">
                <div className="widget--title">
                  <h5>Property Status</h5>
                </div>
                <div className="widget--content">
                  <ul className="list-unstyled mb-0">
                    <li key="For Rent">
                      <Link to="#">
                        For Rent <span>(25)</span>
                      </Link>
                    </li>
                    <li key="For Sale">
                      <Link to="#">
                        For Sale <span>(32)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- .col-md-4 end --> */}
            <div className="col-xs-12 col-sm-12 col-md-8">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="properties-filter clearfix">
                    <div className="select--box pull-left">
                      <label>Sort by:</label>
                      <i className="fa fa-angle-up"></i>
                      <i className="fa fa-angle-down"></i>
                      <select>
                        <option value="Default">Default Sorting</option>
                        <option value="Larger">Newest Items</option>
                        <option value="Larger">oldest Items</option>
                        <option value="Larger">Hot Items</option>
                        <option value="Small">Highest Price</option>
                        <option value="Medium">Lowest Price</option>
                      </select>
                    </div>
                    {/* <!-- .select-box --> */}
                    <div className="view--type pull-right">
                      <Link id="switch-list" to="#" className="active">
                        <i className="fa fa-th-list"></i>
                      </Link>
                      <Link id="switch-grid" to="#" className="">
                        <i className="fa fa-th-large"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="properties properties-list">
                  {/* <!-- .col-md-12 end --> */}

                  {/* <!-- .property item end -->
                                
                                <!-- .property-item #2 --> */}
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    {propertyInfo.map((info) => {
                      return (
                        <div key={info._id}>
                          {/* <!-- .property-item #1 --> */}
                          <div className="property-item">
                            <div className="property--img">
                              <Link to="#">
                                <span></span>
                                <img
                                  src={`data:image/jpeg;base64,${info.propertyGallery[0][0].data}`}
                                  alt="property"
                                  className="img-responsive"
                                  style={{ maxHeight: "200px" }}
                                />
                              </Link>
                              <span className="property--status">
                                {info.propertyStatus}
                              </span>
                            </div>
                            <div className="property--content">
                              <div className="property--info">
                                <h5 className="property--title">
                                  <Link to={`/property/${info._id}`}>
                                    {info["propertyName"]}
                                  </Link>
                                </h5>
                                <p className="property--location">
                                  127 Kent Street, Sydney, NSW 2000
                                </p>
                              </div>
                              {/* <!-- .property-info end --> */}
                              <div className="property--features">
                                <ul className="list-unstyled mb-0">
                                  {info.propertyFeatures.map((feature) => {
                                    return (
                                      <li key={feature}>
                                        <span className="feature">
                                          {feature}:
                                        </span>
                                        <span
                                          className="feature-num"
                                          style={{ fontSize: "10px" }}
                                        >
                                          Available
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              {/* <!-- .property-features end --> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* <!-- .row --> */}
            </div>
            {/* <!-- .col-md-8 end --> */}
          </div>
          {/* <!-- .row --> */}
        </div>
        {/* <!-- .container --> */}
      </section>
      <Footer />
    </div>
  );
};

export default PropertyList;
