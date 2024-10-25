import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addTenant,
  addUser,
  getBrandNames,
  getUserCredentials,
} from "../models/UserModel.js";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
const JWT_SECRET = process.env.JWT_SECRET || "cricket"; // Use environment variable

export const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({ auth: false, message: "You don't have a valid token" });
  } else {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
        
          .json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.user = decoded.data;
        next();
      }
    });
  }
};

export const authorizeCheck = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await getUserCredentials(email);
    const userData = response[0];

    if (userData) {
      if (bcrypt.compareSync(password, userData.password)) {
        const token = jwt.sign(
          { data: userData },
          JWT_SECRET,
          { expiresIn: "1h" } // Use a string for duration
        );

        // Set the token in an HTTP-only cookie
        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "Strict",
          maxAge: 3600000, // 1 hour
        });

        return res.json({
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
