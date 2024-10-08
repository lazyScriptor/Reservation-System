import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import InputFieldCustomized from "../../../ReUsableComponents/InputFieldCustomized";

// Yup validation schema
const tenantSchema = yup.object().shape({
  tenantName: yup.string().required("Tenant name is required"),
  contactPerson: yup.string().required("Contact person is required"),
  contactEmail: yup
    .string()
    .email("Invalid email address")
    .required("Contact email is required"),
  contactPhone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Contact phone is required"),
  subscriptionPlan: yup
    .string()
    .oneOf(["basic", "premium"], "Invalid subscription plan")
    .required("Subscription plan is required"),
});

export default function TenantAddForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tenantSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/tenant/add`,
        {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      console.log("Tenant added successfully", response.data);
      reset();
    } catch (error) {
      console.error("Error adding tenant", error);
    } finally {
      setLoading(false);
 
    }
  };

  return (
    <div className="container shadow-lg rounded-xl p-4">
      <h2 className="text-xl mb-4">Add New Tenant</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Tenant Name */}
        <div>
          <label>Tenant Name</label>
          <InputFieldCustomized
            type="text"
            name="tenantName"
            register={register}
          />
          {errors.tenantName && (
            <p className="text-red-500">{errors.tenantName.message}</p>
          )}
        </div>

        {/* Contact Person */}
        <div>
          <label>Contact Person</label>
          <InputFieldCustomized
            type="text"
            name="contactPerson"
            register={register}
          />
          {errors.contactPerson && (
            <p className="text-red-500">{errors.contactPerson.message}</p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label>Contact Email</label>
          <InputFieldCustomized
            type="email"
            name="contactEmail"
            register={register}
          />
          {errors.contactEmail && (
            <p className="text-red-500">{errors.contactEmail.message}</p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label>Contact Phone</label>
          <InputFieldCustomized
            type="text"
            name="contactPhone"
            register={register}
          />
          {errors.contactPhone && (
            <p className="text-red-500">{errors.contactPhone.message}</p>
          )}
        </div>

        {/* Subscription Plan */}
        <div>
          <label>Subscription Plan</label>
          <select
            {...register("subscriptionPlan")}
            className="border border-gray-300 p-1 pl-2 rounded-md w-full"
          >
            <option value="">Select Plan</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
          {errors.subscriptionPlan && (
            <p className="text-red-500">{errors.subscriptionPlan.message}</p>
          )}
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-brandBlue-400 p-2 rounded-lg text-white hover:bg-brandBlue-500"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            onClick={() => reset()}
            className="bg-primary/80 p-2 rounded-lg text-white hover:bg-primary"
            type="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
