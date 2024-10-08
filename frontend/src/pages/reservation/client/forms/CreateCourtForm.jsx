import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "axios";
import { CourtTypeContext } from "../../../../contexts/Contexts";
import InputFieldCustomized from "../../../../ReUsableComponents/InputFieldCustomized";

const courtSchema = yup.object().shape({
  courtName: yup.string().required("Court name is required"),
  courtType: yup.string().required("Court type is required"),
  bookingLimit: yup.string().required("Booking time limit is required"),
  maintenanceStatus: yup.string().required("Maintenance Status is required"),
  venueName: yup.string().required("Venue name is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  costPerSlot: yup
    .number()
    .typeError("Must be a number")
    .required("Cost per slot is required")
    .min(1, "Cost must be at least 1"),
});

export default function CreateCourtForm() {
  const [loading, setLoading] = useState(false);

  const {
    courtCreateForm,
    setCourtCreateForm,
    courtTypes,
    setCourtTypes,
    selectedVenueId,
    setSelectedVenueId,
    venues,
    setVenues,
  } = useContext(CourtTypeContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courtSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setCourtCreateForm((prev) => ({
      ...prev,
      courtData: data,
    }));

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/court/create-court`,
        data
      );
      console.log("Court data submitted successfully");
      reset();
    } catch (error) {
      console.error("Error occurred in form submit handler", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container shadow-lg rounded-xl">
        <div className="p-4">
          <h2 className="text-xl">Create Court</h2>
        </div>
        <form
          className="flex flex-col p-2 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Venue Name */}
          <div className="flex flex-col">
            <label>Venue Name</label>
            <select
              {...register("venueName")}
              className="border border-gray-300 p-1 pl-2 self-center rounded-md w-full lg:max-w-xl"
              onChange={(e) => {
                setCourtTypes([]);
                setSelectedVenueId(e.target.value); // Update selected venue ID
                register("venueName").onChange(e); // Call original onChange
              }}
            >
              <option value="">Select Venue</option>
              {venues.map((venue) => (
                <option key={venue.venue_id} value={venue.venue_id}>
                  {venue.venue_name}
                </option>
              ))}
            </select>
            {errors.venueName && (
              <p className="text-red-500">{errors.venueName.message}</p>
            )}
          </div>

          {/* Court Type */}
          <div className="flex flex-col">
            <label>Court Type</label>
            <select
              {...register("courtType")}
              className="border border-gray-300 p-1 pl-2 self-center rounded-md w-full lg:max-w-xl"
            >
              <option value="">Select</option>
              {courtTypes.map((courtType) => (
                <option
                  key={courtType.court_type_id}
                  value={courtType.court_type_id}
                >
                  {courtType.type_name}
                </option>
              ))}
            </select>
            {errors.courtType && (
              <p className="text-red-500">{errors.courtType.message}</p>
            )}
          </div>

          {/* Court Name */}
          <div>
            <label>Court Name</label>
            <InputFieldCustomized
              type="text"
              name="courtName"
              register={register}
            />
            {errors.courtName && (
              <p className="text-red-500 h-6">{errors.courtName.message}</p>
            )}
          </div>

          {/* Cost per Slot */}
          <div>
            <label>Cost per Slot</label>
            <InputFieldCustomized
              type="number"
              name="costPerSlot"
              register={register}
            />
            {errors.costPerSlot && (
              <p className="text-red-500">{errors.costPerSlot.message}</p>
            )}
          </div>

          {/* Court Status */}
          <div className="flex flex-col">
            <label>Court Status</label>
            <select
              {...register("courtStatus")}
              className="border border-gray-300 p-1 pl-2 self-center rounded-md w-full lg:max-w-xl"
            >
              <option value="">Select</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="under_maintenance">Under Maintenance</option>
            </select>
            {errors.courtStatus && (
              <p className="text-red-500">{errors.courtStatus.message}</p>
            )}
          </div>

          {/* Opening and Closing hours */}
          <div>
            <label>Opening hours</label>
            <InputFieldCustomized
              type="time"
              name="startTime"
              register={register}
            />
            {errors.startTime && (
              <p className="text-red-500">{errors.startTime.message}</p>
            )}

            <label>Closing hours</label>
            <InputFieldCustomized
              type="time"
              name="endTime"
              register={register}
            />
            {errors.endTime && (
              <p className="text-red-500">{errors.endTime.message}</p>
            )}
          </div>

          {/* Booking time limit */}
          <div className="flex flex-col">
            <label>Booking time limit</label>
            <select
              {...register("bookingLimit")}
              className="border border-gray-300 p-1 pl-2 self-center rounded-md w-full lg:max-w-xl"
            >
              <option value="">Select</option>
              <option value="00:15:00">15 mins</option>
              <option value="00:30:00">30 mins</option>
              <option value="01:00:00">1 hr</option>
              <option value="02:00:00">2 hrs</option>
            </select>
            {errors.bookingLimit && (
              <p className="text-red-500">{errors.bookingLimit.message}</p>
            )}
          </div>

          {/* Maintenance Status */}
          <div className="flex flex-col">
            <label>Maintenance Status</label>
            <select
              {...register("maintenanceStatus")}
              className="border border-gray-300 p-1 pl-2 self-center rounded-md w-full lg:max-w-xl"
            >
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
            {errors.maintenanceStatus && (
              <p className="text-red-500">{errors.maintenanceStatus.message}</p>
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
  );
}
