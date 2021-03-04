import { useHistory } from "react-router-dom";
// import {Button} from '@material-ui/core'
import { useDispatch } from "react-redux";
import { logOut } from "../features/Admin/adminSlice";
import { clearBussiness } from "../features/Property/PropertySlice";
import { useEffect } from "react";

const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBussiness());
    dispatch(logOut());
    history.replace({ pathname: "/" });
  });

  return <div></div>;
};

export default LogOut;
