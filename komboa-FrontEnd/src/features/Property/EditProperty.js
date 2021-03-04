import MapComponent from "../../components/Maps/MapComponent";
import Counties from "../../variables/Counties";
import { FileInput } from "../../components/DropZone/DropzoneComponent";
import { useForm, Controller } from "react-hook-form";
import { propertyFeatures } from "../../variables/PropertyFeatures";
import Type from "../../variables/Type";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { cordinateSelector } from "../../components/Maps/MapsSlice";
import { idSelector } from "../Admin/adminSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const EditProperty = () => {
  const [checkox] = useState([]);
  const [marker, setMarkers] = useState([]);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const cordinates = useSelector(cordinateSelector);
  const userId = useSelector(idSelector);

  const schema = yup.object().shape({
    title: yup.string().required("Property Name is required"),
    description: yup.string(),
    type: yup.string(),
    status: yup.string(),
    floors: yup.string(),
    video: yup.string(),
    files: yup.array().min(1),
    feature: yup.array(),
  });

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCheckbox = (e) => {
    checkox.push(e.target.value);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("Name", data.title);
    formData.append("Description", data.description);
    formData.append("Type", data.type);
    formData.append("Status", data.status);
    formData.append("Floors", data.floors);
    formData.append("VideoUrl", data.video);
    formData.append("Features", checkox);
    formData.append("LocationLat", marker.lat);
    formData.append("LocationLng", marker.lng);
    formData.append("id", userId);

    for (let file of data.files) {
      formData.append("file", file, file.name);
    }

    axios({
      method: "put",
      url: `/editproperty/${id}`,
      data: formData,
      headers: { "content-Type": "multipart/form-data" },
    })
      .then((response) => {
        history.push(`/property/${response.data}`);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `/property/${id}`,
    })
      .then((response) => {
        setDetails(response.data);
        setMarkers(response.data["propertyLocation"]);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
  });
  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Maps Loading";

  const center = {
    lat: -1.286389,
    lng: 36.817223,
  };

  const handleMapClick = (e) => {
    setMarkers({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    console.log(marker);
  };

  return (
    <section id="add-property" className="add-property">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            {details && (
              <form className="mb-0" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">Property Description</h4>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="property-title">Property Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          id="property-title"
                          ref={register}
                          defaultValue={details.propertyName}
                        />
                        {errors.title && errors.title.message}
                      </div>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="property-description">
                          Property Description*
                        </label>
                        <textarea
                          className="form-control"
                          name="description"
                          id="property-description"
                          rows="2"
                          ref={register}
                          defaultValue={details.propertyDescription}
                        ></textarea>
                        {errors.description && errors.description.message}
                      </div>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="select-type">Type</label>
                        <div className="select--box">
                          <i className="fa fa-angle-down"></i>
                          <select
                            id="select-type"
                            name="type"
                            ref={register}
                            defaultValue={details.propertyType}
                          >
                            {Type.map((category) => {
                              return (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              );
                            })}
                          </select>
                          {errors.type && errors.type.message}
                        </div>
                      </div>
                    </div>

                    {/* <!-- .col-md-4 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="select-status">Status</label>
                        <div className="select--box">
                          <i className="fa fa-angle-down"></i>
                          <select
                            id="select-status"
                            name="status"
                            ref={register}
                            defaultValue={details.propertyStatus}
                          >
                            <option value="For Sale">Sale</option>
                            <option value="Rent">Rent</option>
                          </select>
                          {errors.status && errors.status.message}
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Floors">Floors</label>
                        <input
                          type="text"
                          className="form-control"
                          name="floors"
                          id="Floors"
                          ref={register}
                          defaultValue={details.floors}
                        />
                        {errors.floors && errors.floors.message}
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Video-URL">Video URL</label>
                        <input
                          type="text"
                          className="form-control"
                          name="video"
                          id="Video-URL"
                          placeholder="Youtube, Vimeo, Dailymotion, etc.."
                          ref={register}
                        />
                        {errors.video && errors.video.message}
                      </div>
                    </div>
                    {/* <!-- .col-md-4 end --> */}
                  </div>
                  {/* <!-- .row end --> */}
                </div>
                {/* <!-- .form-box end --> */}
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">Property Features</h4>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    {/* <!-- .col-md-3 end --> */}

                    {propertyFeatures.map((feature) => {
                      return (
                        <div
                          className="col-xs-12 col-sm-6 col-md-3"
                          key={feature}
                        >
                          <div className="input-checkbox">
                            <label className="label-checkbox">
                              <span>{feature}</span>
                              <Controller
                                control={control}
                                name="features"
                                render={({ onChange }) => (
                                  <input
                                    type="checkbox"
                                    value={feature}
                                    name="features"
                                    ref={register}
                                    onChange={handleCheckbox}
                                  />
                                )}
                              />
                              <span className="check-indicator"></span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                    {/* <!-- .col-md-3 end --> */}
                  </div>
                  {/* <!-- .row end --> */}
                </div>
                {/* <!-- .form-box end --> */}

                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">Property Gallery</h4>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-12">
                      <FileInput
                        name="files"
                        control={control}
                        onSubmit={handleSubmit(onSubmit)}
                      />
                      {errors.files && (
                        <p>Please add atleast 1 image for your new gallery</p>
                      )}
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                  </div>
                  {/* <!-- .row end --> */}
                </div>
                {/* <!-- .form-box end --> */}

                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">Property Location</h4>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <GoogleMap
                          mapContainerStyle={{
                            width: "100%",
                            height: "500px",
                          }}
                          onClick={handleMapClick}
                          center={center}
                          zoom={11}
                          options={{
                            disableDefaultUI: true,
                            zoomControl: true,
                          }}
                        >
                          <Marker
                            position={{
                              lat: marker.lat,
                              lng: marker.lng,
                            }}
                          ></Marker>
                        </GoogleMap>
                      </div>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                  </div>
                  {/* <!-- .row end --> */}
                </div>
                {/* <!-- .form-box end --> */}
                <input
                  type="submit"
                  value="Save Edits"
                  name="submit"
                  className="btn btn--primary"
                />
              </form>
            )}
          </div>
          {/* <!-- .col-md-12 end --> */}
        </div>
        {/* <!-- .row end --> */}
      </div>
    </section>
  );
};

export default EditProperty;
