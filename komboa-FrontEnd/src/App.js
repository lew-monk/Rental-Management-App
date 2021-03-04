// import NavBar from './features/Nav/NavBar'
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import "./components/404.css";
import Loading from "./components/Loading";
import AddProperty from "./features/Property/AddProperty";
import LandingPage from "./features/Landing/LandingPage";
import PropertyList from "./features/Property/PropertyList";
import AddListing from "./features/Property/AddListing";
import NotFound from "./components/NotFound";
import UserProfile from "./components/UserProfileComponent";
import LogOut from "./components/LogOut";
import PropertyDetails from "./features/Property/PropertyDetails";
import NavBar from "./features/Nav/NavBar";
import ListingDetails from "./features/Property/ListingDetails";
import UserProperties from "./features/Property/UserProperties";
import UserPropertiesDetails from "./features/Property/UserPropertiesDetails";
import EditListing from "./features/Property/EditListing";
import EditProperty from "./features/Property/EditProperty";

// const LandingPage = lazy(() => import('./features/Landing/LandingPage'))
// const AddProperty = lazy(() => import('./features/Property/AddProperty'))
// const PropertyList = lazy(() => import('./features/Property/PropertyList'))
// const AddListing = lazy(() => import('./features/Property/AddListing'))
// const UserProfile = lazy(() => import('./components/UserProfileComponent'))
// const PropertyDetails = lazy(() => import('./features/Property/PropertyDetails'))
// const ListingDetails = lazy(() => import('./features/Property/ListingDetails'))
// const NotFound = lazy(() => import('./components/NotFound'))
// const Carousels = lazy(() => import('./components/Carousel'))
// const EditProperty = lazy(() => import("./features/Property/EditProperty"))

function App() {
  return (
    <Router>
      {/* <Suspense fallback={<div>Loading....{Loading}</div>}> */}
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/addproperty" component={AddProperty} />
          <Route exact path="/propertylist" component={PropertyList} />
          <Route exact path="/:id/addlisting" component={AddListing} />
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/property/:id" component={PropertyDetails} />
          <Route exact path="/listing/:id" component={ListingDetails} />
          <Route exact path="/logout" component={LogOut} />
          <Route exact path="/userproperty" component={UserProperties} />
          <Route
            exact
            path="/user-property-details/:id"
            component={UserPropertiesDetails}
          />
          <Route exact path="/edit-listings/:id" component={EditListing} />
          <Route exact path="/edit-property/:id" component={EditProperty} />

          <Route component={NotFound} />
        </Switch>
      </div>
      {/* </Suspense> */}
    </Router>
  );
}

export default App;
