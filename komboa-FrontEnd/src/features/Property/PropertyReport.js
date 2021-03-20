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
  h6: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "16%",
  },
  h7: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "19%",
  },
  h8: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "24%",
  },
  h9: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "20%",
  },
});

const PropertyReports = () => {
  const [listings, setListings] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `/${id}/listing`,
    })
      .then((response) => {
        setListings(response.data);
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
                    <h1>Property Report</h1>
                  </div>
                  <ol className="breadcrumb">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="active"> Property Report</li>
                  </ol>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {listings && (
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
              <Text style={styles.header}>Property Report</Text>

              <View style={styles.nav}>
                <Text style={styles.h2}>Listings</Text>
              </View>
              <View style={styles.records}>
                <View style={styles.record}>
                  <Text style={styles.h3}>All Listings - </Text>
                  <Text style={styles.h4}> {listings.length}</Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Booked Listings -</Text>
                  <Text style={styles.h6}>
                    {
                      listings.filter((listing) => listing.bookedBy !== null)
                        .length
                    }
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Not Booked -</Text>
                  <Text style={styles.h7}>
                    {
                      listings.filter((listing) => listing.bookedBy == null)
                        .length
                    }
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Rented -</Text>
                  <Text style={styles.h8}>
                    {
                      listings.filter((listing) => listing.rentedBy !== null)
                        .length
                    }
                  </Text>
                </View>
                <View style={styles.record}>
                  <Text style={styles.h3}>Not Rented -</Text>
                  <Text style={styles.h9}>
                    {
                      listings.filter((listing) => listing.rentedBy === null)
                        .length
                    }
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

export default PropertyReports;
