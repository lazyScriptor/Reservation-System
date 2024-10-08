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
    } catch (error) {
      console.error("Error occurred in form submit handler", error);
      throw new Error("Error occurred in form submit handler", error); // Optional: rethrow or handle it
    }
  };

  return (
    <div>
      <div className="container shadow-lg rounded-xl">
        <div className="p-4">
          <h2 className="text-xl">Create Venue</h2>
        </div>
        <div>
          <form
            className="flex flex-col p-2 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Venue Name */}
            <div>
              <label>Venue Name</label>
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
