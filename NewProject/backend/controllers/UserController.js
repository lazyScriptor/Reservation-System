import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addTenant,
  addUser,
  getBrandNames,
  getUserCredentials,
} from "../models/UserModel.js";
const isProduction = process.env.NODE_ENV === "production";

const saltRounds = 10; // Not used in this code but should be used when hashing passwords
const JWT_SECRET = process.env.JWT_SECRET || "cricket"; // Use environment variable
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "baseballSecret"; // Use environment variable

export const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({ auth: false, message: "You don't have a valid token" });
  } else {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.user = decoded.data; // Make sure this matches your token payload
        next();
      }
    });
  }
};

const generateToken = (user, secret, expiresIn) => {
  return jwt.sign({ data: user }, secret, { expiresIn });
};

export const authorizeCheck = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await getUserCredentials(email);
    const userData = response[0];

    if (userData) {
      // Compare password
      const passwordMatch = bcrypt.compareSync(password, userData.password);
      if (passwordMatch) {
        // Generate tokens
        const accessToken = generateToken(
          userData,
          JWT_SECRET,
          process.env.JWT_EXPIRATION // Ensure this is defined
        );
        const refreshToken = generateToken(
          userData,
          JWT_REFRESH_SECRET,
          process.env.JWT_REFRESH_EXPIRATION
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          path: "/", // Ensure the cookie is available on all routes
          maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration (e.g., 1 week)
        });

        return res.json({
          accessToken,
          authorizationStatus: true,
          message: "Authorization successful",
          userFoundStatus: true,
        });
      } else {
        return res.status(401).json({
          authorizationStatus: false,
          message: "User found but Authorization failed",
          userFoundStatus: true,
        });
      }
    } else {
      return res.status(404).json({
        authorizationStatus: false,
        message: "User not found & Authorization failed ",
        userFoundStatus: false,
      });
    }
  } catch (error) {
    console.error("Error during authorization:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);
  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateToken(
      user,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION
    );
    res.json({ accessToken: newAccessToken });
  });
};

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
