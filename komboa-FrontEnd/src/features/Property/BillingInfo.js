import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BillingDetails = () => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();

  const paid = () => {
    var paid = document.getElementById("paid").innerText;
    console.log(paid);
    return paid;
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `/billing-information/${id}`,
    })
      .then((doc) => setDetails(doc.data))
      .catch((err) => console.log(err.message));

    const script = document.createElement("script");
    script.src = "../../variables/script.js";
    script.async = true;
    document.body.append("script");

    return () => {
      document.body.remove("script");
    };
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
                    <h1>Billing Details</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="active"> Billing Report</li>
                  </ol>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {details.listingStatus === "Sale" && (
        <div>
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
                </tr>
              </thead>
              <tbody>
                {details.buying.installments.map((installment) => {
                  return (
                    <tr>
                      <td>{new Date(installment.paidAt).toLocaleString()}</td>
                      <td>{installment.amount}</td>
                      <td>{installment.refNo}</td>
                      <td>{installment.confirmation}</td>
                    </tr>
                  );
                })}
              </tbody>
              <caption>
                <h2>Installments</h2>
              </caption>
            </table>
          </div>
          <div className="table-custom">
            <table class="table">
              <caption>
                <h2>Break-Down</h2>
              </caption>
              <thead class="thead-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Amount</th>

                  <th scope="col">Listing Price</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {new Date(details.buying.deposit.paidAt).toLocaleString()}
                  </td>
                  <td>Total Confirmed</td>
                  <td id="paid">
                    {details.buying.installments
                      .filter((installment) => {
                        return installment.confirmation === "Confirmed";
                      })
                      .reduce(
                        (sum = 0, installment) => sum + installment.amount,
                        0
                      )}
                  </td>
                  <td>{details.listingPrice}</td>
                  <td>{details.listingPrice - paid}</td>
                </tr>
                <tr>
                  <td>
                    {new Date(details.buying.deposit.paidAt).toLocaleString()}
                  </td>
                  <td>Total Pending</td>
                  <td>
                    {details.buying.installments
                      .filter((installment) => {
                        return installment.confirmation === "Pending";
                      })
                      .reduce(
                        (sum = 0, installment) => sum + installment.amount,
                        0
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {details.listingStatus === "Rent" && (
        <div>
          <div className="table-custom">
            <table class="table">
              <caption>
                <h2>Entry Payments</h2>
              </caption>
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Amount Billed</th>
                  <th scope="col">Reference Number</th>
                  <th scope="col">Confirmation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    {new Date(details.paidBills.entry.paidAt).toLocaleString()}
                  </td>
                  <td>{details.paidBills.entry.total}</td>
                  <td>
                    {details.billing.entry.rent +
                      details.billing.entry.deposit +
                      details.billing.entry.water +
                      details.billing.entry.electricity}
                  </td>
                  <td>{details.paidBills.entry.refNo}</td>
                  <td>{details.paidBills.entry.confirmation}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-custom">
            <table class="table">
              <caption>
                <h2>Monthly Payments</h2>
              </caption>
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Reference Number</th>
                  <th scope="col">Confirmation</th>
                </tr>
              </thead>
              <tbody>
                {details.paidBills.monthly.map((month) => {
                  return (
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        {new Date(
                          details.paidBills.entry.paidAt
                        ).toLocaleString()}
                      </td>
                      <td>{month.rent}</td>
                      <td>{month.refNo}</td>
                      <td>{month.confirmation}</td>
                      <td>{month.confirmation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="table-custom">
            <table class="table">
              <caption>
                <h2>Break Down</h2>
              </caption>
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Total Billed</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>Confirmed</td>
                  <td>
                    {details.paidBills.monthly
                      .filter((installment) => {
                        return installment.confirmation === "Confirmed";
                      })
                      .reduce(
                        (sum = 0, installment) =>
                          sum +
                          installment.rent +
                          installment.water +
                          installment.electricity,
                        0
                      )}
                  </td>
                  <td>
                    {details.billing.monthly.rent +
                      details.billing.monthly.water +
                      details.billing.monthly.electricity}
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>Pending</td>
                  <td>
                    {details.paidBills.monthly
                      .filter((installment) => {
                        return installment.confirmation === "Pending";
                      })
                      .reduce(
                        (sum = 0, installment) =>
                          sum +
                          installment.rent +
                          installment.water +
                          installment.electricity,
                        0
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingDetails;
