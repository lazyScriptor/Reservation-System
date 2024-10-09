import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
import { CourtTypeContext } from "../../../../contexts/Contexts";
import InputFieldCustomized from "../../../../ReUsableComponents/InputFieldCustomized";

// Yup validation schema for the venue form
const venueSchema = yup.object().shape({
  venueName: yup
    .string()
    .required("Venue name is required")
    .max(150, "Max 150 characters"),
  venueAddress: yup.string().required("Venue address is required"),
  venueDescription: yup.string(),
  contactInfo: yup.string().max(100, "Max 100 characters"),
  openingHours: yup.string().required("Opening hours are required"),
  closingHours: yup.string().required("Closing hours are required"),
  status: yup
    .string()
    .oneOf(["open", "closed"], "Invalid status")
    .required("Status is required"),
});

export default function CreateVenueForm() {
  const { courtCreateForm, setCourtCreateForm } = useContext(CourtTypeContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const onSubmit = async (data) => {
    setCourtCreateForm((prev) => ({
      ...prev,
      venueData: data,
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/venue/create-venue`,
        {
          ...data,
          tenantId: localStorage.getItem("tenantId"),
        }
      );
      console.log("Form submitted succeddfully");
      reset();
    } catch (error) {
      console.error("Error occurred in form submit handler", error);
      throw new Error("Error occurred in form submit handler", error); // Optional: rethrow or handle it
    }
  };

  return (
    <div>
      <div className="shadow-lg rounded-xl p-4  border-gray-100 border-2 relative">
       
          <h2 className="text-xl font-bold py-2 text-gray-500">Create Venue</h2>
      
        <div>
          <form
            className="flex flex-col py-2 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Venue Name */}
            <div>
              <label>Venue Name</label>
              <p className="text-sm text-gray-500 py-2">
                Enter the name of your venue (e.g., "Downtown Sports Complex").
              </p>
              <InputFieldCustomized
                type="text"
                name="venueName"
                register={register}
              />
              {errors.venueName && (
                <p className="text-red-500 h-6">{errors.venueName.message}</p>
              )}
            </div>

            {/* Venue Address */}
            <div>
              <label>Venue Address</label>
              <p className="text-sm text-gray-500 py-2">
                Provide the full address of your venue.
              </p>
              <InputFieldCustomized
                type="text"
                name="venueAddress"
                register={register}
              />
              {errors.venueAddress && (
                <p className="text-red-500 h-6">
                  {errors.venueAddress.message}
                </p>
              )}
            </div>

            {/* Venue Description (optional) */}
            <div>
              <label>Venue Description</label>
              <p className="text-sm text-gray-500 py-2">
                Describe your venue (optional). This can include features,
                services, or amenities.
              </p>
              <InputFieldCustomized
                type="text"
                name="venueDescription"
                register={register}
              />
              {errors.venueDescription && (
                <p className="text-red-500 h-6">
                  {errors.venueDescription.message}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <label>Contact Info</label>
              <p className="text-sm text-gray-500 py-2">
                Add a phone number or email address for inquiries.This number will be displayed to the customer base
              </p>
              <InputFieldCustomized
                type="text"
                name="contactInfo"
                register={register}
              />
              {errors.contactInfo && (
                <p className="text-red-500 h-6">{errors.contactInfo.message}</p>
              )}
            </div>

            {/* Opening Hours */}
            <div>
              <label>Opening Hours</label>
              <p className="text-sm text-gray-500 py-2">
                When does your venue open? (e.g., 08:00 AM)
              </p>
              <InputFieldCustomized
                type="time"
                name="openingHours"
                register={register}
              />
              {errors.openingHours && (
                <p className="text-red-500 h-6">
                  {errors.openingHours.message}
                </p>
              )}
            </div>

            {/* Closing Hours */}
            <div>
              <label>Closing Hours</label>
              <p className="text-sm text-gray-500 py-2">
                When does your venue close? (e.g., 10:00 PM)
              </p>
              <InputFieldCustomized
                type="time"
                name="closingHours"
                register={register}
              />
              {errors.closingHours && (
                <p className="text-red-500 h-6">
                  {errors.closingHours.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label>Status</label>
              <p className="text-sm text-gray-500 py-2">
                Select whether the venue is currently open or closed.
              </p>
              <select
                {...register("status")}
                className="border border-gray-300 p-1 pl-2 rounded-md w-full lg:max-w-xl"
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
              {errors.status && (
                <p className="text-red-500 h-6">{errors.status.message}</p>
              )}
            </div>
              <div className="h-20"/>
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
    </div>
  );
}
