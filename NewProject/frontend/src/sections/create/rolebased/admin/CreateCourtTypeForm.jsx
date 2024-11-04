import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { CourtTypeContext } from "../../../../contexts/Contexts";
import InputFieldCustomized, {
  SelectFieldCustomized,
} from "../../../../components/InputFieldCustomized";
import { decodeToken } from "../../../../contexts/helpers/helper";

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
        // Token handling for the API
        const token = localStorage.getItem("accessToken");
        const decodedTokenDetails = decodeToken(token);
        const tenantId = decodedTokenDetails.payload.tenant_id;
        
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
      <div className="shadow-lg rounded-xl p-4 border-gray-100 border-2 relative ">
        <h2 className="text-xl font-bold py-2 text-gray-500">
          Create Court Type
        </h2>
        <form
          className="flex flex-col py-2 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Court Name */}
          <div>
            <label>Court Type Name</label>
            <p className="text-sm text-gray-500 py-2">
              If you have 2 Tennis courts in the
              <strong> following Venue</strong> , Create the "Court Type Name"
              as Tennis.
            </p>
            <InputFieldCustomized
              type="text"
              name="courtName"
              register={register}
            />
            {errors.courtName && (
              <p className="text-red-500 h-6">{errors.courtName.message}</p>
            )}
          </div>

          {/* Venue Name */}
          <div>
            <SelectFieldCustomized
              name="venueName"
              register={register}
              options={venues.map((venue) => ({
                value: venue.venue_id,
                label: venue.venue_name,
              }))} // Map venues to options
              error={errors.venueName} // Pass the error state
              helperText={errors.venueName?.message} // Pass the helper text
              label="Venue" // Pass the label
              description="Select the venue that you want to create court type"
              setErrorMessage={() => {}} // Placeholder function for setting error messages
              setErrorToogle={() => {}} // Placeholder function for toggling error state
            />
          </div>
          {/* Court Type */}
          <div>
            <SelectFieldCustomized
              name="courtType"
              register={register}
              options={courtTypeOptions} // Pass the options for court types
              error={errors.courtType} // Pass the error state
              helperText={errors.courtType?.message} // Pass the helper text
              label="Court Type Schedule mode" // Pass the label
              description={`There are ${courtTypeOptions.length} reservation palette options available at the moment For more information, check the demo`}
              setErrorMessage={() => {}} // Placeholder function for setting error messages
              setErrorToogle={() => {}} // Placeholder function for toggling error state
            />
          </div>

          {/* Court Description */}
          <div>
            <label>Court Description</label>
            <p className="text-sm text-gray-500 py-2">
              Describe the court (optional). This may include dimensions,
              surface type, etc. (only visible to you)
            </p>
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

          <div className="h-20" />
          {/* Submit and Reset Buttons */}
          <div className="flex p-4 gap-4 self-center absolute bg-gray-100 bottom-0 w-full rounded-b-lg">
            <button
              className="bg-brandBlue/80 hover:bg-brandBlue p-2 px-8 text-white hover:bg-brandBlue-500 self-center"
              type="submit"
            >
              Submit
            </button>
            <button
              onClick={() => reset()}
              className="bg-gray-300 p-2  text-white hover:bg-primary self-center"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
