import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UserListing = () => {
  const [details, setDetails] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/listingdetails/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  return <div></div>;
};

export default UserListing;
