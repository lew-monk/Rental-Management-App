import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { idSelector } from "../Admin/adminSlice";
import axios from "axios";

const UserProperties = () => {
  const id = useSelector(idSelector);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/userproperty/${id}`,
    })
      .then((response) => setDetails(response.data))
      .catch((err) => err.message);
  }, []);

  console.log(details);
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
                    <h1>my properties</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="active">my properties</li>
                  </ol>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="my-properties" className="my-properties properties-list">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-4">
              <div className="edit--profile-area">
                <ul className="edit--profile-links list-unstyled mb-0">
                  <li>
                    <Link to="/userprofile" className="active">
                      Edit Profile
                    </Link>
                  </li>

                  <li>
                    <Link to="/addproperty">Add Property</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8">
              {/* <!-- .property-item #1 --> */}
              {details && details.length <= 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3 style={{ textAlign: "center" }}>
                    You Dont have any Properties
                  </h3>
                  <Link to="/addproperty" className="btn">
                    <i className="fa fa-plus"></i> add property
                  </Link>
                </div>
              ) : (
                details && (
                  <div>
                    {details.map((info) => {
                      return (
                        <div className="property-item" key={info._id}>
                          <div className="property--img">
                            <Link to="#">
                              <img
                                src={`data:image/jpeg;base64,${info.propertyGallery[0][0].data}`}
                                alt="property"
                                className="img-responsive"
                                style={{ maxHeight: "200px" }}
                              />
                              <span className="property--status">
                                {info.propertyStatus}
                              </span>
                            </Link>
                          </div>
                          <div className="property--content">
                            <div className="property--info">
                              <h5 className="property--title">
                                <Link to={`/user-property-details/${info._id}`}>
                                  {info.propertyName}
                                </Link>
                              </h5>
                              <p className="property--location">
                                Africa Nairobi, Kenya
                              </p>
                              {/* <p className="property--price">$115,000</p> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProperties;
