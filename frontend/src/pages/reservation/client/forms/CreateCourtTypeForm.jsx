import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
import { CourtTypeContext } from "../../../../contexts/Contexts";
import InputFieldCustomized, { SelectFieldCustomized } from "../../../../ReUsableComponents/InputFieldCustomized";

// Yup validation schema
const courtSchema = yup.object().shape({
  courtName: yup.string().required("Court name is required"),
  courtType: yup.string().required("Court type is required"),
  venueName: yup.string().required("Venue name is required"),
  courtDescription: yup.string().max(250),
});

export default function CreateCourtTypeForm() {
  const [venues, setVenues] = useState([]);
  const { courtCreateForm, setCourtCreateForm } = useContext(CourtTypeContext);

  useEffect(() => {
    const fetchVenueNames = async () => {
      try {
        const tenantId = localStorage.getItem("tenantId");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/venue/name/${tenantId}`
        );
        setVenues(response.data.Venues);
      } catch (error) {
        console.error("Error fetching venue names:", error);
      }
    };

    fetchVenueNames();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courtSchema),
  });

  const onSubmit = async (data) => {
    setCourtCreateForm((prev) => ({
      ...prev,
      courtData: data,
    }));

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/court-types/create-court-type`,
        data
      );
      reset();
      console.log("Court data submitted successfully");
    } catch (error) {
      console.error("Error occurred in form submit handler", error);
    }
  };

  // Options for court types
  const courtTypeOptions = [
    { value: 1, label: "Small and compact" },
    { value: 2, label: "Bigger slots" },
  ];

  return (
    <div>
      <div className="container shadow-lg rounded-xl">
        <div className="p-4 ">
          <h2 className="text-xl">Create Court Type</h2>
        </div>
        <div>
          <form
            className="flex flex-col p-2 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Court type name */}
            <div>
              <label>Court type name </label>
              <InputFieldCustomized
                type="text"
                name="courtName"
                register={register}
              />
              {errors.courtName && (
                <p className="text-red-500 h-6">{errors.courtName.message}</p>
              )}
            </div>

            {/* Court Type */}
            <SelectFieldCustomized
              name="courtType"
              register={register}
              options={courtTypeOptions} // Pass the options for court types
              error={errors.courtType} // Pass the error state
              helperText={errors.courtType?.message} // Pass the helper text
              label="Schedule Type" // Pass the label
              setErrorMessage={() => {}} // Placeholder function for setting error messages
              setErrorToogle={() => {}} // Placeholder function for toggling error state
            />

            {/* Venue Name */}
            <SelectFieldCustomized
              name="venueName"
              register={register}
              options={venues.map((venue) => ({
                value: venue.venue_id,
                label: venue.venue_name,
              }))} // Map venues to options
              error={errors.venueName} // Pass the error state
              helperText={errors.venueName?.message} // Pass the helper text
              label="Venue Name" // Pass the label
              setErrorMessage={() => {}} // Placeholder function for setting error messages
              setErrorToogle={() => {}} // Placeholder function for toggling error state
            />

            {/* Court description */}
            <div>
              <label>Court description </label>
              <InputFieldCustomized
                type="text"
                name="courtDescription"
                register={register}
              />
              {errors.courtDescription && (
                <p className="text-red-500 h-6">
                  {errors.courtDescription.message}
                </p>
              )}
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex p-4 gap-4 self-center">
              <button
                className="bg-brandBlue-400 p-2 rounded-lg text-white hover:bg-brandBlue-500 self-center"
                type="submit"
              >
                Submit
              </button>
              <button
                onClick={() => reset()}
                className="bg-primary/80 p-2 rounded-lg text-white hover:bg-primary self-center"
                type="reset"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
