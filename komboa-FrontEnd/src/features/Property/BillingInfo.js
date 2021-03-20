import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import axios from "axios";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textAlign: "center",
    fontSize: "2rem",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  image: {
    margin: "1rem auto",
  },
  nav: {
    borderBottom: "1px #6C7C8E50 solid",
    flexDirection: "column",
    marginTop: "3%",
    width: "70%",
    justifyContent: "center",
  },
  h2: {
    textAlign: "center",
    fontSize: "24px",
  },
  records: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "20%",
  },
  record: {
    padding: "2.5% 5%",
  },
  h3: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
  },
  h4: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "20%",
  },
  h5: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "17%",
  },
});

const BillingDetails = () => {
  const [info, setInfo] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `/get-billing-information/${id}`,
    })
      .then((response) => {
        setInfo(response.data);
      })
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

      {info && (
        <section className="pdf-view">
          <Document>
            <Page size="A4" style={styles.page}>
              <Text style={styles.image}>
                <img
                  className="logo-dark"
                  src="/assets/images/logo/logo-dark.png"
                  alt="Land Logo"
                />
              </Text>
              <Text style={styles.header}>
                Monthly Billing Info as Of -{" "}
                {new Date(info.date).toDateString()}
              </Text>

              <View style={styles.nav}>
                <Text style={styles.h2}>Bills</Text>
              </View>
              <View style={styles.records}>
                <View style={styles.record}>
                  <Text style={styles.h3}>Rent - </Text>
                  <Text style={styles.h4}>
                    Ksh. {info.billing.monthly.rent}
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Water -</Text>
                  <Text style={styles.h4}>
                    Ksh. {info.billing.monthly.water}
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Electricity -</Text>
                  <Text style={styles.h5}>
                    Ksh. {info.billing.monthly.electricity}
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        </section>
      )}
      {info && (
        <section className="pdf-view">
          <Document>
            <Page size="A4" style={styles.page}>
              <Text style={styles.image}>
                <img
                  className="logo-dark"
                  src="/assets/images/logo/logo-dark.png"
                  alt="Land Logo"
                />
              </Text>
              <Text style={styles.header}>
                Entry Billing Info as Of - {new Date(info.date).toDateString()}
              </Text>

              <View style={styles.nav}>
                <Text style={styles.h2}>Bills</Text>
              </View>
              <View style={styles.records}>
                <View style={styles.record}>
                  <Text style={styles.h3}>Rent - </Text>
                  <Text style={styles.h4}>
                    Ksh. {info.billing.entry.rent || "Not Billed Yet"}
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Deposit - </Text>
                  <Text style={styles.h4}>
                    Ksh. {info.billing.entry.deposit || "Not Billed Yet"}
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Water -</Text>
                  <Text style={styles.h4}>
                    Ksh. {info.billing.entry.water || "Not Billed Yet"}
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Electricity -</Text>
                  <Text style={styles.h5}>
                    Ksh. {info.billing.entry.electricity || "Not Billed Yet"}
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Other -</Text>
                  <Text style={styles.h5}>
                    Ksh. {info.billing.entry.other || "Not Billed Yet"}
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        </section>
      )}
    </div>
  );
};

export default BillingDetails;
