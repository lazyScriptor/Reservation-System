import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { CourtTypeContext } from "../../../../contexts/Contexts";
import InputFieldCustomized from "../../../../components/InputFieldCustomized";
import NotificationPane from "../../../../components/NotificationPane";

// Yup validation schema for the form
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
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

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
    setLoading(true);
    console.log(data);
    setCourtCreateForm((prev) => ({
      ...prev,
      courtData: data,
    }));

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/court/create-court`,
        data
      );
      console.log("Court data submitted successfully");

      // Show success notification
      setNotification({
        message: "Court created successfully!",
        type: "success",
        visible: true,
      });

      reset();
    } catch (error) {
      console.error("Error occurred in form submit handler", error);

      // Show error notification
      setNotification({
        message: "Failed to create court. Please try again.",
        type: "error",
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div>
      <div className="shadow-lg rounded-xl p-4  border-gray-100 border-2 relative">
        <h2 className="text-xl font-bold py-2 text-gray-500">Create Court</h2>

        {/* Notification Pane */}
        <NotificationPane
          message={notification.message}
          type={notification.type}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />

        <form
          className="flex flex-col  gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Venue Name */}
          <div className="flex flex-col">
            <label>Venue </label>
            <p className="text-sm text-gray-500 py-2">
              Select the Venue ,Then you will see the court types relevant to
              the venue
            </p>
            <select
              {...register("venueName")}
              className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange`}
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
            <p className="text-sm text-gray-500 py-2">
              Select the most appropriate court type relevant to the court
            </p>
            <select
              {...register("courtType")}
              className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange`}
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
            <p className="text-sm text-gray-500 py-2">
              This name will be the court name that your customers will see
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

          {/* Cost per Slot */}
          <div>
            <label>Cost per Slot</label>
            <p className="text-sm text-gray-500 py-2">
              Enter the hourly rate, you will be able to change special hourly
              rate later
            </p>
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
            <p className="text-sm text-gray-500 py-2">
              Customers will only be able to make reservations if the court is
              in the available status
            </p>
            <select
              {...register("courtStatus")}
              className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange`}
            >
              <option value="">Select</option>
              <option className="text-green-600" value="available">
                Available
              </option>
              <option className="text-red-600" value="booked">
                Booked
              </option>
              <option className="text-red-600" value="under_maintenance">
                Under Maintenance
              </option>
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
              className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange`}
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
              className={`border border-gray-300 p-1 pl-2 rounded-md w-full text-brandOrange/80 focus:border-0 ring-brandOrange/60 focus:ring-brandOrange`}
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
