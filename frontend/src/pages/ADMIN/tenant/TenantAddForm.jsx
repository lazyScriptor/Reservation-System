import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import NotificationPane from "../../../components/NotificationPane";
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
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  userEmail: yup
    .string()
    .email("Invalid email address")
    .required("User email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  userType: yup.string().required("User type is required"),
  password: yup.string().required("Password is required"),
  profilePhoto: yup.string().nullable(),
  address: yup.string().required("Address is required"),
  membershipStatus: yup.string().oneOf(["active", "inactive"], "Invalid membership status"),
  role: yup.string().oneOf(["user", "admin"], "Invalid role"),
});

export default function TenantAddForm() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

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
    console.log(data);
    try {
      // Step 1: Add the tenant
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/tenant/add`,
        {
          tenant_name: data.tenantName,
          contact_person: data.contactPerson,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone,
          subscription_plan: data.subscriptionPlan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      );
      console.log("Tenant added successfully", response.data);

      // Step 2: Construct user data for the user table
      const userData = {
        tenant_id: response.data.tenant_id, // Assuming the response returns tenant_id
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.userEmail,
        phone_number: data.phoneNumber,
        user_type: data.userType,
        password: data.password,
        profile_photo: data.profilePhoto || null, // Allow for a null or default value
        address: data.address,
        membership_status: data.membershipStatus,
        role: data.role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Step 3: Add the user
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/add`, // Update the endpoint to match your API
        userData
      );

      // Show success notification
      setNotification({
        message: "Tenant and user added successfully!",
        type: "success",
        visible: true,
      });

      reset();
    } catch (error) {
      console.error("Error adding tenant or user", error);

      // Show error notification
      setNotification({
        message: "Failed to add tenant or user. Please try again.",
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
    <div className="container shadow-lg rounded-xl p-4">
      <div className="container">
        <h2 className="text-xl mb-4">Add New Tenant and User</h2>

        {/* Notification Pane */}
        <NotificationPane
          message={notification.message}
          type={notification.type}
          visible={notification.visible}
          onClose={handleCloseNotification}
        />

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

          {/* First Name */}
          <div>
            <label>First Name</label>
            <InputFieldCustomized
              type="text"
              name="firstName"
              register={register}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label>Last Name</label>
            <InputFieldCustomized
              type="text"
              name="lastName"
              register={register}
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          {/* User Email */}
          <div>
            <label>User Email</label>
            <InputFieldCustomized
              type="email"
              name="userEmail"
              register={register}
            />
            {errors.userEmail && (
              <p className="text-red-500">{errors.userEmail.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label>Phone Number</label>
            <InputFieldCustomized
              type="text"
              name="phoneNumber"
              register={register}
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* User Type */}
          <div>
            <label>User Type</label>
            <select
              {...register("userType")}
              className="border border-gray-300 p-1 pl-2 rounded-md w-full"
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="basic user">Basic User</option>
            </select>
            {errors.userType && (
              <p className="text-red-500">{errors.userType.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <InputFieldCustomized
              type="password"
              name="password"
              register={register}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label>Profile Photo URL</label>
            <InputFieldCustomized
              type="text"
              name="profilePhoto"
              register={register}
            />
            {errors.profilePhoto && (
              <p className="text-red-500">{errors.profilePhoto.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label>Address</label>
            <InputFieldCustomized
              type="text"
              name="address"
              register={register}
            />
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>

          {/* Membership Status */}
          <div>
            <label>Membership Status</label>
            <select
              {...register("membershipStatus")}
              className="border border-gray-300 p-1 pl-2 rounded-md w-full"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors.membershipStatus && (
              <p className="text-red-500">{errors.membershipStatus.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label>Role</label>
            <select
              {...register("role")}
              className="border border-gray-300 p-1 pl-2 rounded-md w-full"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
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
    </div>
  );
}
