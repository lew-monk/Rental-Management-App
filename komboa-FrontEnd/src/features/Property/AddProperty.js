import { Helmet } from "react-helmet";
import AddPropertyForm from "../../components/AddPropertyForm";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const AddProperty = () => {
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
                  <div className="title--heading custom">
                    <h1>Add Property</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="active">Add Property</li>
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
      <AddPropertyForm />
      <Footer />
    </div>
  );
};

export default AddProperty;
