import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const ConfirmPayment = () => {
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const handleConfirmPayment = (data) => {
    axios({
      method: "PUT",
      url: `/confirm-payment/${id}`,
      data: { id: data },
    })
      .then((res) => window.location.refresh(true))
      .catch((err) => console.log(err.message));
  };

  const handleRentConfirm = (param) => {
    axios({
      method: "PUT",
      url: `/confirm-monthly-bills/${id}`,
      data: { id: param },
    });
  };

  const handleEntryConfirm = () => {
    axios({
      method: "PUT",
      url: `/confirm-entry-bill/${id}`,
    });
  };

  const handleCloseDialogue = () => {
    setOpen(false);
  };
  const handleOpenDialogue = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `/listingdetails/${id}`,
    })
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  return (
    <div id="wrapper" className="wrapper clearfix">
      {details.listingStatus === "Sale" && (
        <section id="add-property" className="add-property">
          <div className="table-custom">
            <table class="table">
              <caption>
                <h2>Deposit</h2>
              </caption>
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Reference Number</th>
                  <th scope="col">Confirmation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    {new Date(details.buying.deposit.paidAt).toLocaleString()}
                  </td>
                  <td>{details.buying.deposit.amount}</td>
                  <td>{details.buying.deposit.refNo}</td>
                  <td>{details.buying.deposit.confirmation}</td>
                  <td>
                    <button
                      className="btn btn--primary"
                      style={{
                        transform: "scale(0.7)",
                      }}
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-custom">
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Reference Number</th>
                  <th scope="col">Confirmation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {details.buying.installments.map((installment, index) => {
                  return (
                    <tr key={index}>
                      <td>{new Date(installment.paidAt).toLocaleString()}</td>
                      <td>{installment.amount}</td>
                      <td>{installment.refNo}</td>
                      <td>{installment.confirmation}</td>
                      {installment.confirmation === "Pending" ? (
                        <td>
                          <button
                            className="btn btn--primary"
                            style={{
                              transform: "scale(0.7)",
                            }}
                            onClick={handleOpenDialogue}
                          >
                            Confirm
                          </button>
                          <Dialog
                            open={open}
                            onClose={handleCloseDialogue}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {`Are you sure you want to Confirm Payment for this listing ?`}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Once Payment is Confirmed it cannot be
                                unconfirmed. Move with Caution
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() =>
                                  handleConfirmPayment(installment._id)
                                }
                                color="primary"
                              >
                                Confirm
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
                        </td>
                      ) : (
                        <td>
                          <button
                            className="btn "
                            disabled
                            style={{
                              transform: "scale(0.7)",
                            }}
                            onClick={() =>
                              handleConfirmPayment(installment._id)
                            }
                          >
                            Confirmed
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              <caption>
                <h2>Installments</h2>
              </caption>
            </table>
          </div>
        </section>
      )}
      {details.listingStatus === "Rent" && (
        <section id="add-property" className="add-property">
          <div className="table-custom">
            <table class="table">
              <caption>
                <h2>Entry Payment</h2>
              </caption>
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Reference Number</th>
                  <th scope="col">Confirmation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    {new Date(details.paidBills.entry.paidAt).toLocaleString()}
                  </td>
                  <td>{details.paidBills.entry.total}</td>
                  <td>{details.paidBills.entry.refNo}</td>
                  <td>{details.paidBills.entry.confirmation}</td>
                  <td>
                    {details.paidBills.entry.confirmation === "Confirmed" ? (
                      <button
                        className="btn"
                        style={{
                          transform: "scale(0.7)",
                        }}
                        disabled
                        onClick={handleEntryConfirm}
                      >
                        Confirmed
                      </button>
                    ) : (
                      <button
                        className="btn btn--primary"
                        style={{
                          transform: "scale(0.7)",
                        }}
                        onClick={handleEntryConfirm}
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-custom">
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">rent</th>
                  <th scope="col">water</th>
                  <th scope="col">electricity</th>
                  <th scope="col">Reference Number</th>
                  <th scope="col">Confirmation</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {details.paidBills.monthly.map((installment) => {
                  return (
                    <tr>
                      <td>{new Date(installment.paidAt).toLocaleString()}</td>
                      <td>{installment.rent}</td>
                      <td>{installment.water}</td>
                      <td>{installment.electricity}</td>
                      <td>{installment.refNo}</td>
                      <td>{installment.confirmation}</td>
                      <td>
                        {installment.confirmation === "Pending" ? (
                          <button
                            className="btn btn--primary"
                            style={{
                              transform: "scale(0.7)",
                            }}
                            onClick={() => handleRentConfirm(installment._id)}
                          >
                            Confirm
                          </button>
                        ) : (
                          <button
                            className="btn"
                            style={{
                              transform: "scale(0.7)",
                            }}
                            disabled
                            onClick={() => handleRentConfirm(installment._id)}
                          >
                            Confirmed
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <caption>
                <h2>Monthly Payment</h2>
              </caption>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default ConfirmPayment;
