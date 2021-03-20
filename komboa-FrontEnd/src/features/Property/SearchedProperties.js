import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { propertyFoundSelector } from "./PropertySlice";

const SearchResults = () => {
  const [results] = useState([]);
  const propertySelector = useSelector(propertyFoundSelector);
  const entries = Object.entries(propertySelector);
  for (const [choose, count] of entries) {
    results.push(count);
  }

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
                    <h1>Search Results</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="#">Home</Link>
                    </li>
                    <li className="active">Search</li>
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
      <section id="properties-list">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">
              <div className="widget widget-property">
                <div className="widget--title">
                  <h5>Property Status</h5>
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
                {results.length > 0 ? (
                  <div className="properties properties-list">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      {results.map((info) => {
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
                                    Africa - Kenya
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
                ) : (
                  <div>
                    <h2> Search Result is Empty</h2>
                  </div>
                )}
              </div>
              {/* <!-- .row --> */}
            </div>
            {/* <!-- .col-md-8 end --> */}
          </div>
          {/* <!-- .row --> */}
        </div>
        {/* <!-- .container --> */}
      </section>
    </div>
  );
};

export default SearchResults;
