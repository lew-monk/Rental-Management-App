import MapComponent from "./Maps/MapComponent";
import Counties from "../variables/Counties";
import { FileInput } from "../components/DropZone/DropzoneComponent";
import { useForm, Controller } from "react-hook-form";
import { propertyFeatures } from "../variables/PropertyFeatures";
import Type from "../variables/Type";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cordinateSelector } from "../components/Maps/MapsSlice";
import { idSelector } from "../features/Admin/adminSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";

const AddPropertyForm = () => {
  const [checkox] = useState([]);
  const history = useHistory();
  const cordinates = useSelector(cordinateSelector);
  const id = useSelector(idSelector);

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required(),
    status: yup.string().required(),
    floors: yup.number(),
    video: yup.string(),
    files: yup.array().min(1).required(),
  });

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCheckbox = (e) => {
    checkox.push(e.target.value);
    console.log(checkox);
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
    formData.append("LocationLat", cordinates.lat);
    formData.append("LocationLng", cordinates.lng);
    formData.append("id", id);

    for (let file of data.files) {
      formData.append("file", file, file.name);
    }

    axios({
      method: "post",
      url: "/add-business",
      data: formData,
      headers: { "content-Type": "multipart/form-data" },
    })
      .then((response) => {
        history.push(`/property/${response.data}`);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <section id="add-property" className="add-property">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
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
                      />
                      {errors.title && "Title is required"}
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
                      ></textarea>
                      {errors.description &&
                        "Property Description is important"}
                    </div>
                  </div>
                  {/* <!-- .col-md-12 end --> */}
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <div className="form-group">
                      <label htmlFor="select-type">Type</label>
                      <div className="select--box">
                        <i className="fa fa-angle-down"></i>
                        <select id="select-type" name="type" ref={register}>
                          {Type.map((category) => {
                            return (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* <!-- .col-md-4 end --> */}
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <div className="form-group">
                      <label htmlFor="select-status">Status</label>
                      <div className="select--box">
                        <i className="fa fa-angle-down"></i>
                        <select id="select-status" name="status" ref={register}>
                          <option value="For Sale">Sale</option>
                          <option value="Rent">Rent</option>
                        </select>
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
                      />
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
                    {errors.files && <p>{errors.files.message}</p>}
                  </div>
                  {/* <!-- .col-md-12 end --> */}
                </div>
                {/* <!-- .row end --> */}
              </div>
              {/* <!-- .form-box end --> */}

              <div className="form-box">
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <h4 className="form--title">
                      Property Location ( Add Pin )
                    </h4>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className="form-group">
                      <MapComponent className="form-control" />
                    </div>
                  </div>
                  {/* <!-- .col-md-12 end --> */}
                </div>
                {/* <!-- .row end --> */}
              </div>
              {/* <!-- .form-box end --> */}

              <input
                type="submit"
                value="Add Listing"
                name="submit"
                className="btn btn--primary"
                style={{ marginLeft: "10px" }}
              />
            </form>
          </div>
          {/* <!-- .col-md-12 end --> */}
        </div>
        {/* <!-- .row end --> */}
      </div>
    </section>
  );
};

export default AddPropertyForm;
