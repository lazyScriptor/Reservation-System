import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

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
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"), // or however you set it
          },
          withCredentials: true, // Important: This allows cookies to be sent and received
        }
      );
  
      if (response.data.authorizationStatus) {
        navigate("/dashboard-admin");
        console.log("Login successful!", response.data);
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
