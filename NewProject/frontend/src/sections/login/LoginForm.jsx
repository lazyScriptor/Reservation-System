import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../contexts/helpers/helper";

// Validation Schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export default function LoginForm() {
  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/authorize-check`,
        data,
        { withCredentials: true }
      );
      if (response.data.authorizationStatus) {
        localStorage.setItem("accessToken", response.data.accessToken);
        const decodedDetails = decodeToken(response.data.accessToken).payload;
        console.log(decodedDetails);
        localStorage.setItem("userName", [
          `${decodedDetails.first_name} 
          ${decodedDetails.last_name}`,
        ]);
        localStorage.setItem("role", decodedDetails.role);
        if (decodedDetails.user_type == "admin") {
          console.log("This route has not been created yet");
        } else if (
          decodedDetails.role == "manager" &&
          decodedDetails.user_type == "client"
        ) {
          navigate("/dashboard-admin");
        } else if (
          decodedDetails.role == "staff" &&
          decodedDetails.user_type == "client"
        ) {
          console.log("This route has not been created yet");
        } else if (
          decodedDetails.role == "user" &&
          decodedDetails.user_type == "client"
        ) {
          navigate("/dashboard-basicuser");
        }
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}
