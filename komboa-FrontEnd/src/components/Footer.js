import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="footer footer-1 bg-white">
      <section
        id="cta"
        className="cta cta-1 text-center bg-overlay bg-overlay-dark pt-90 bg-section"
      >
        {/* <div className="bg-section"><img src=" alt="Background"/></div> */}
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3">
              <h3>Joining a community of tenants and property owners and</h3>
              <Link to="#" className="btn btn--primary">
                Contact
              </Link>
            </div>
            {/* <!-- .col-md-6 --> */}
          </div>
          {/* <!-- .row --> */}
        </div>
        {/* <!-- .container --> */}
      </section>

      <div className="footer--copyright text-center">
        <div className="container">
          <div className="row footer--bar">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <span>
                © 2021 <Link to="#">Komboa</Link>, All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
