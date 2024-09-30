import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFieldCustomized from "../../../ReUsableComponents/InputFieldCustomized"; // Customize if needed
import axios from "axios";
import StepperHorizontal from "../../../components/StepperHorizontal";

// Yup validation schema for the venue form
const venueSchema = yup.object().shape({
  venue_name: yup.string().required("Venue name is required").max(150, "Max 150 characters"),
  venue_address: yup.string().required("Venue address is required"),
  venue_description: yup.string(),
  contact_info: yup.string().max(100, "Max 100 characters"),
  opening_hours: yup.string().required("Opening hours are required"),
  closing_hours: yup.string().required("Closing hours are required"),
  status: yup.string().oneOf(['open', 'closed'], 'Invalid status').required("Status is required"),
});

export default function CreateVenueForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  const onSubmit = async (data) => {
    console.log(data)
    // try {
    //   await axios.post(`${import.meta.env.VITE_API_URL}/venue/create-venue`, data);
    // } catch (error) {
    //   console.error("Error occurred during form r", error);
    // }
  };

  return (
    <div>

      <StepperHorizontal color={'brandBlue'} number={1}/>
      <div className="container shadow-lg rounded-xl">
        <div className="p-4">
          <h2 className="text-xl">Create Venue</h2>
        </div>
        <div>
          <form className="flex flex-col p-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Venue Name */}
            <div>
              <label>Venue Name</label>
              <InputFieldCustomized
                type="text"
                name="venue_name"
                register={register}
              />
              {errors.venue_name && (
                <p className="text-red-500 h-6">{errors.venue_name.message}</p>
              )}
            </div>

            {/* Venue Address */}
            <div>
              <label>Venue Address</label>
              <InputFieldCustomized
                type="text"
                name="venue_address"
                register={register}
              />
              {errors.venue_address && (
                <p className="text-red-500 h-6">{errors.venue_address.message}</p>
              )}
            </div>

            {/* Venue Description (optional) */}
            <div>
              <label>Venue Description</label>
              <InputFieldCustomized
                type="text"
                name="venue_description"
                register={register}
              />
              {errors.venue_description && (
                <p className="text-red-500 h-6">{errors.venue_description.message}</p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <label>Contact Info</label>
              <InputFieldCustomized
                type="text"
                name="contact_info"
                register={register}
              />
              {errors.contact_info && (
                <p className="text-red-500 h-6">{errors.contact_info.message}</p>
              )}
            </div>

            {/* Opening Hours */}
            <div>
              <label>Opening Hours</label>
              <InputFieldCustomized
                type="time"
                name="opening_hours"
                register={register}
              />
              {errors.opening_hours && (
                <p className="text-red-500 h-6">{errors.opening_hours.message}</p>
              )}
            </div>

            {/* Closing Hours */}
            <div>
              <label>Closing Hours</label>
              <InputFieldCustomized
                type="time"
                name="closing_hours"
                register={register}
              />
              {errors.closing_hours && (
                <p className="text-red-500 h-6">{errors.closing_hours.message}</p>
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
