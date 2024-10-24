import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addTenant,
  addUser,
  getBrandNames,
  getUserCredentials,
} from "../models/UserModel.js";

const saltRounds = 10;
const JWT_SECRET_KEY = "codensolutions";
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);
const REFRESH_TOKEN_SECRET = "your_refresh_token_secret"; // Keep this secret safe!

// Function to generate JWT tokens
const generateTokens = (userData) => {
  const accessToken = jwt.sign({ data: userData }, "cricket", {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ data: userData }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

// Middleware to check refresh token
export const checkRefreshToken = async (req, res) => {
  const { cookies } = req;
  const refreshToken = cookies.refreshToken;
  console.log("This is the cookie, : ", refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try { 
    const userData = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ data: userData.data }, "cricket", {
      expiresIn: "15m",
    });
    return res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const authorizeCheck = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await getUserCredentials(email);
    const userData = response[0];

    if (userData) {
      if (bcrypt.compareSync(password, userData.password)) {
        const { accessToken, refreshToken } = generateTokens(userData);

        // Store refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Set to true in production
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({
          authorizationStatus: true,
          accessToken,
          message: "Authorization successful",
          userFoundStatus: true,
        });
      } else {
        return res.json({
          authorizationStatus: false,
          message: "User found but Authorization failed",
          userFoundStatus: true,
        });
      }
    } else {
      return res.json({
        authorizationStatus: false,
        message: "User not found & Authorization failed",
        userFoundStatus: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add other controller methods like getBrandNamesController and addTenantController...

export const getBrandNamesController = async (req, res) => {
  try {
    const response = await getBrandNames();

    return res.json(response);
  } catch (error) {
    throw error;
  }
};
export const addTenantController = async (req, res) => {
  try {
    const {
      tenantName,
      contactPerson,
      contactEmail,
      contactPhone,
      subscriptionPlan,
      createdAt,
      updatedAt,
      firstName,
      lastName,
      userEmail,
      phoneNumber,
      userType,
      password,
      profilePhoto,
      address,
      membershipStatus,
      role,
    } = req.body;

    // Validation logic (if needed) can be done here

    // Prepare tenant data
    const tenantData = {
      tenantName,
      contactPerson,
      contactEmail,
      contactPhone,
      subscriptionPlan,
      createdAt,
      updatedAt,
    };

    // Call the model to insert the tenant
    const tenantResponse = await addTenant(tenantData);

    // Prepare user data
    const userData = {
      tenantId: tenantResponse.insertId, // Use the inserted tenant ID
      firstName,
      lastName,
      email: userEmail,
      phoneNumber,
      userType,
      // Hash the password before saving it
      password: bcrypt.hashSync(password, saltRounds),
      profilePhoto: profilePhoto || null,
      address,
      membershipStatus,
      role,
      createdAt,
      updatedAt,
    };

    // Call the model to insert the user
    await addUser(userData); // Implement the addUser function to handle the insert

    return res.json({
      message: "Tenant and user added successfully",
      tenantId: tenantResponse.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding tenant and user" });
  }
};
