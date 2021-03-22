import { FileInput } from "../../components/DropZone/DropzoneComponent";
import { useForm } from "react-hook-form";
import { features } from "../../variables/ListingFeatures";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import {
  listingTypes,
  listingBedrooms,
  Floor,
  Bathrooms,
} from "../../variables/ListingTypes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddListing = () => {
  const history = useHistory();
  const { id } = useParams();

  const schema = yup.object().shape({
    "listing-description": yup.string(),
    "listing-type": yup.string(),
    "listing-bedrooms": yup.string(),
    "listing-bathrooms": yup.string(),
    Floors: yup.string(),
    "listing-size": yup.number(),
    "listing-area": yup.number("Area of the listing should be a number"),
    "Video-URL": yup.string(),
    "listing-features": yup.array(),
    "listing-price": yup.number("Price of the listing should be a number"),
    files: yup.array().min(1),
  });

  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("Description", data["listing-description"]);
    formData.append("Type", data["listing-type"]);
    formData.append("Status", data["listing-status"]);
    formData.append("Bedrooms", data["listing-bedrooms"]);
    formData.append("Bathrooms", data["listing-bathrooms"]);
    formData.append("Floors", data.Floors);
    formData.append("Size", data["listing-size"]);
    formData.append("Areas", data["listing-area"]);
    formData.append("Video-URL", data["Video-URL"]);
    formData.append("Features", data["listing-features"]);
    formData.append("Price", data["listing-price"]);

    for (let file of data.files) {
      formData.append("file", file, file.name);
    }
    axios({
      method: "post",
      url: `/${id}/addlisting`,
      data: formData,
      headers: { "content-Type": "multipart/form-data" },
    })
      .then((response) => {
        const id = response.data;
        history.push(`/listing/${id}`);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div id="wrapper" className="wrapper clearfix">
      <section id="add-property" className="add-property">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <form className="mb-0" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">Listing Description</h4>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label htmlFor="property-description">
                          Listing Description*
                        </label>
                        <textarea
                          className="form-control"
                          name="listing-description"
                          id="property-description"
                          rows="2"
                          ref={register}
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
                            ref={register}
                            name="listing-type"
                          >
                            {listingTypes.map((type) => {
                              return (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              );
                            })}
                          </select>
                          {errors["listing-type"] &&
                            errors["listing-type"].message}
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
                            ref={register}
                            name="listing-status"
                          >
                            <option value="Sale">Sale</option>
                            <option value="Rent">Rent</option>
                          </select>
                          {errors["listing-status"] &&
                            errors["listing-status"].message}
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Bedrooms">Bedrooms</label>
                        <select
                          id="select-status"
                          name="listing-bedrooms"
                          ref={register}
                        >
                          {listingBedrooms.map((bedroom) => {
                            return (
                              <option value={bedroom} key={bedroom}>
                                {bedroom}
                              </option>
                            );
                          })}
                        </select>
                        {errors["listing-bedrooms"] &&
                          errors["listing-bedrooms"].message}
                      </div>
                    </div>
                    {/* <!-- .col-md-4 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Bathrooms">Washrooms</label>
                        <select
                          id="select-status"
                          name="listing-bathrooms"
                          ref={register}
                        >
                          {Bathrooms.map((bathroom) => {
                            return (
                              <option value={bathroom} key={bathroom}>
                                {bathroom}
                              </option>
                            );
                          })}
                        </select>
                        {errors["listing-bathrooms"] &&
                          errors["listing-bathrooms"].message}
                      </div>
                    </div>
                    {/* <!-- .col-md-4 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Floors">Floor</label>
                        <select id="select-status" name="Floors" ref={register}>
                          {Floor.map((floor) => {
                            return (
                              <option value={floor} key={floor}>
                                {floor}
                              </option>
                            );
                          })}
                        </select>
                        {errors.Floors && errors.Floors.message}
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Area">Area</label>
                        <input
                          type="text"
                          className="form-control"
                          name="listing-area"
                          id="Area"
                          placeholder="sq meters"
                          ref={register}
                        />
                      </div>
                      {errors["listing-area"] && (
                        <p>Area of the listing should be a number</p>
                      )}
                    </div>
                    {/* <!-- .col-md-4 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Size">Size</label>
                        <input
                          type="text"
                          className="form-control"
                          name="listing-size"
                          id="Size"
                          placeholder="sq meter"
                          ref={register}
                        />
                      </div>
                      {errors["listing-size"] && (
                        <p>Size of the listing should be a number</p>
                      )}
                    </div>
                    {/* <!-- .col-md-4 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Sale-Rent-Price">
                          Sale or Rent Price*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="listing-price"
                          id="Sale-Rent-Price"
                          ref={register}
                        />
                        {errors["listing-price"] && (
                          <p>Price of the listing should be a number</p>
                        )}
                      </div>
                    </div>

                    <div className="col-xs-12 col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="Video-URL">Video URL</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Video-URL"
                          id="Video-URL"
                          placeholder="Youtube, Vimeo, Dailymotion, etc.."
                          ref={register}
                        />
                        {errors["Video-URL"] && errors["Video-URL"].message}
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
                      <h4 className="form--title">Listing Features</h4>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    {features.map((feature) => {
                      return (
                        <div
                          className="col-xs-12 col-sm-6 col-md-3"
                          key={feature}
                        >
                          <div className="input-checkbox">
                            <label className="label-checkbox">
                              <span>{feature}</span>
                              <input
                                type="checkbox"
                                name="listing-features"
                                value={feature}
                                ref={register}
                              />
                              {errors["listing-features"] &&
                                errors["listing-features"].message}
                              <span className="check-indicator"></span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                    {/* <!-- .col-md-3 end --> */}

                    {/* <!-- .col-md-3 end --> */}
                  </div>
                  {/* <!-- .row end --> */}
                </div>
                {/* <!-- .form-box end --> */}

                <div className="form-box">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <h4 className="form--title">Listing Gallery</h4>
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                    <div className="col-xs-12 col-sm-4 col-md-12">
                      {/* <div id="dZUpload" className="dropzone">
                                    </div> */}
                      <FileInput name="files" control={control} />
                      {errors.files && (
                        <p>Please add Images to your new gallery</p>
                      )}
                    </div>
                    {/* <!-- .col-md-12 end --> */}
                  </div>
                  {/* <!-- .row end --> */}
                </div>
                {/* <!-- .form-box end --> */}

                {/* <!-- .form-box end --> */}
                <input
                  type="submit"
                  value="Save Edits"
                  name="submit"
                  className="btn btn--primary"
                />
              </form>
            </div>
            {/* <!-- .col-md-12 end --> */}
          </div>
          {/* <!-- .row end --> */}
        </div>
      </section>
    </div>
  );
};

export default AddListing;
