import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CourtTypeContext } from "../../../contexts/Contexts";
import InputFieldCustomized from "../../../ReUsableComponents/InputFieldCustomized";
import axios from "axios";
import StepperHorizontal from "../../../components/StepperHorizontal";
// Yup validation schema
const courtSchema = yup.object().shape({
  courtName: yup.string().required("Court name is required"),
  courtType: yup.string().required("Court type is required"),
  venueName: yup.string().required("Court type is required"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  noOfAreas: yup
    .number()
    .typeError("Must be a number")
    .required("Number of areas is required")
    .min(1, "Must have at least 1 area"),
  costPerSlot: yup
    .number()
    .typeError("Must be a number")
    .required("Number of areas is required")
    .min(1, "Must have at least 1 area"),
  intervalSize: yup
    .number()
    .typeError("Must be a number")
    .required("Number of areas is required")
    .min(1, "Must have at least 1 area"),
});

export default function CourtForm() {
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    const fetchVenueNames = async () => {
      try {
        const id = localStorage.getItem("userId");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/venue/name/${id}`
        );
        console.log(response.data.Venues);
        setVenues(response.data.Venues);
      } catch (error) {
        console.error("Error fetching venue names:", error);
      }
    };

    fetchVenueNames();
  }, []);


  const { courtCreateForm, setCourtCreateForm } = useContext(CourtTypeContext);

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
        `${import.meta.env.VITE_API_URL}/court/create-court`,
        data
      );
      console.log("Court data submitted successfully");
    } catch (error) {
      console.error("Error occurred in form submit handler", error);
      throw new Error("Error occurred in form submit handler", error); // Optional: rethrow or handle it
    }
  };

  return (
    <div>
      {/* <StepperHorizontal number={2} color={"brandBlue"} /> */}
      <div className="container shadow-lg rounded-xl">
        <div className="p-4 ">
          <h2 className="text-xl">Create Court type</h2>
        </div>
        <div>
          <form
            className="flex flex-col p-2 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Court Name */}
            <div>
              <label>Court name</label>
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
            <div className="flex flex-col">
              <label>Court type</label>
              <select
                {...register("courtType")}
                className="border border-gray-300 p-1 pl-2 self-center rounded-md  w-full lg:max-w-xl"
              >
                <option value="">Select </option>{" "}
                {/* Default unselected option */}
                <option value={1}>Type 1</option>
                <option value={2}>Type 2</option>
                <option value={3}>Type 3</option>
              </select>
              {errors.courtType && (
                <p className="text-red-500">{errors.courtType.message}</p>
              )}
            </div>
            {/* Venue type */}
            <div className="flex flex-col">
              <label>Venue name</label>
              <select
                {...register("venueName")}
                className="border border-gray-300 p-1 pl-2 self-center rounded-md  w-full lg:max-w-xl"
              >
                {venues && venues.map((venue, index) => (
                
                    <option key={index} value={1}>{venue}</option>
                 
                ))}
              </select>
              {errors.courtType && (
                <p className="text-red-500">{errors.courtType.message}</p>
              )}
            </div>

            {/* Time Selectors */}
            <div className="">
              <label>Start Time</label>
              <InputFieldCustomized
                type="time"
                name="startTime"
                register={register}
              />
              {errors.startTime && (
                <p className="text-red-500">{errors.startTime.message}</p>
              )}

              <label>End Time</label>
              <InputFieldCustomized
                type="time"
                name="endTime"
                register={register}
              />
              {errors.endTime && (
                <p className="text-red-500">{errors.endTime.message}</p>
              )}
            </div>

            {/* Number of Areas */}
            <div>
              <label>No of areas</label>
              <InputFieldCustomized
                type="number"
                name="noOfAreas"
                register={register}
              />
              {errors.noOfAreas && (
                <p className="text-red-500">{errors.noOfAreas.message}</p>
              )}
            </div>

            {/* Cost per slot */}
            <div>
              <label>Cost per slot</label>
              <InputFieldCustomized
                type="number"
                name="costPerSlot"
                register={register}
              />
              {errors.noOfAreas && (
                <p className="text-red-500">{errors.noOfAreas.message}</p>
              )}
            </div>
            {/* Interval size */}
            <div>
              <label>Interval Size</label>
              <InputFieldCustomized
                type="number"
                name="intervalSize"
                register={register}
              />
              {errors.noOfAreas && (
                <p className="text-red-500">{errors.noOfAreas.message}</p>
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
