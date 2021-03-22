import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

const Installments = () => {
  const { register, handleSubmit } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const { id } = useParams();

  const onSubmitDeposit = (data) => {
    axios({
      method: "PUT",
      url: `/add-deposit/${id}`,
      data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };
  const onSubmitIntallments = (data) => {
    axios({
      method: "PUT",
      url: `/add-installment/${id}`,
      data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  return (
    <div id="wrapper" className="wrapper clearfix">
      <section id="add-property" className="add-property">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <form className="mb-0" onSubmit={handleSubmit(onSubmitDeposit)}>
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">
                        Add Deposit/ Down Payment (Amount in Ksh)
                      </h4>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-6">
                      <div className="form-group">
                        <label htmlFor="Area">Deposit</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Deposit"
                          ref={register}
                        />
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-6">
                      <div className="form-group">
                        <label htmlFor="Size">Mpesa / Transaction ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="reference"
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
              <form
                className="mb-0"
                onSubmit={handleSubmit2(onSubmitIntallments)}
              >
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">
                        Enter Installments Information (Amount in Ksh)
                      </h4>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-6">
                      <div className="form-group">
                        <label htmlFor="Area">Installment </label>
                        <input
                          type="text"
                          className="form-control"
                          name="installment"
                          ref={register2}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-6">
                      <div className="form-group">
                        <label htmlFor="Area">Mpesa / Transaction ID </label>
                        <input
                          type="text"
                          className="form-control"
                          name="reference"
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

export default Installments;
