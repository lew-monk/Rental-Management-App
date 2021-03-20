import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Billing = () => {
  const { register, handleSubmit } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const { id } = useParams();
  const history = useHistory();

  const onSubmitMonthly = (data) => {
    axios({
      method: "PUT",
      url: `/add-billing-information/${id}`,
      data,
    })
      // .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };
  const onSubmitEntry = (data) => {
    axios({
      method: "PUT",
      url: `/add-entry-billing-information/${id}`,
      data,
    })
      .then((response) => history.goBack())
      .catch((err) => console.log(err.message));
  };

  return (
    <div id="wrapper" className="wrapper clearfix">
      <section id="add-property" className="add-property">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <form className="mb-0" onSubmit={handleSubmit(onSubmitMonthly)}>
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">
                        Monthly Billing Information (Amount in Ksh)
                      </h4>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Area">Rent / Deposit</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Rent"
                          ref={register}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Size">Water Bill</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Water"
                          ref={register}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Size">Electricity Bill</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Electricity"
                          ref={register}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Save Edits"
                  name="submit"
                  className="btn btn--primary"
                />
              </form>
            </div>
          </div>

          <div className="row" style={{ marginTop: "2.5rem" }}>
            <div className="col-xs-12 col-sm-12 col-md-12">
              <form className="mb-0" onSubmit={handleSubmit2(onSubmitEntry)}>
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">
                        Entry Billing Information (Amount in Ksh)
                      </h4>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Area">Rent </label>
                        <input
                          type="text"
                          className="form-control"
                          name="Rent"
                          ref={register2}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Area">Deposit </label>
                        <input
                          type="text"
                          className="form-control"
                          name="Deposit"
                          ref={register2}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Size">Water Bill</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Water"
                          ref={register2}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Size">Electricity Bill</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Electricity"
                          ref={register2}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Size">Other Bills</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Other"
                          ref={register2}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Save Edits"
                  name="submit"
                  className="btn btn--primary"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Billing;
