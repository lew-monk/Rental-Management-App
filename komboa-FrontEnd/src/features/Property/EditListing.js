import { useState, useEffect } from "react";
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

const AddListing = () => {
  const { register, handleSubmit, control } = useForm();
  const history = useHistory();
  const { id } = useParams();
  const [details, setDetails] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `/listingdetails/${id}`,
    })
      .then((response) => {
        setDetails(response.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const onSubmit = (data) => {
    console.log(data);
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
      method: "put",
      url: `/updatelisting/${id}`,
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
              {details && (
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
                            defaultValue={details.listingDescription}
                          ></textarea>
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
                              defaultValue={details.listingType}
                              placeholder={details.listingType}
                            >
                              {listingTypes.map((type) => {
                                return (
                                  <option key={type} value={type}>
                                    {type}
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
                            <select
                              id="select-status"
                              ref={register}
                              name="listing-status"
                              defaultValue={details.listingStatus}
                            >
                              <option value="Sale">Sale</option>
                              <option value="Rent">Rent</option>
                            </select>
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
                                <option
                                  value={bedroom}
                                  key={bedroom}
                                  defaultValue={details.listingBedrooms}
                                >
                                  {bedroom}
                                </option>
                              );
                            })}
                          </select>
                          {/* <input type="text" className="form-control" name="listing-bedrooms" id="Bedrooms" ref = {register}/> */}
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
                            defaultValue={details.listingBathrooms}
                          >
                            {Bathrooms.map((bathroom) => {
                              return (
                                <option value={bathroom} key={bathroom}>
                                  {bathroom}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      {/* <!-- .col-md-4 end --> */}
                      <div className="col-xs-12 col-sm-4 col-md-4">
                        <div className="form-group">
                          <label htmlFor="Floors">Floor</label>
                          <select
                            id="select-status"
                            name="Floors"
                            ref={register}
                            defaultValue={details.listingFloors}
                          >
                            {Floor.map((floor) => {
                              return (
                                <option value={floor} key={floor}>
                                  {floor}
                                </option>
                              );
                            })}
                          </select>
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
                            placeholder="sq ft"
                            ref={register}
                            defaultValue={details.listingArea}
                          />
                        </div>
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
                            placeholder="sq ft"
                            ref={register}
                            defaultValue={details.listingSize}
                          />
                        </div>
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
                            defaultValue={details.listingPrice}
                          />
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
                            defaultValue={details.listingVideo}
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
                        <FileInput
                          name="files"
                          control={control}
                          defaultValue={details.listingGallery}
                        />
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
              )}
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
