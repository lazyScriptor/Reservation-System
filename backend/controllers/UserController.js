import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  addTenant,
  getBrandNames,
  getUserCredentials,
} from "../models/UserModel.js";
import { response } from "express";
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

export const authorizeCheck = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await getUserCredentials(email);
    // bcrypt.hash("123", saltRounds, function (err, hash) {
    //   console.log(hash);
    // });
    const userData = response[0];
    if (userData) {
      if (bcrypt.compareSync(password, userData.password)) {
        const token = jwt.sign(
          {
            data: userData,
          },
          "cricket",
          { expiresIn: 60 * 60 }
        );
        return res.json({
          authorizationStatus: true,
          token,
          message: "Authorization successful",
          userFoundStatus: true,
        });
      } else {
        return res.json({
          authorizationStatus: false,
          token: false,
          message: "User found but Authorization failed",
          userFoundStatus: true,
        });
      }
    } else {
      return res.json({
        authorizationStatus: false,
        token: false,
        message: "User not found & Authorization failed ",
        userFoundStatus: false,
      });
    }
  } catch (error) {
    throw error;
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
    } = await req.body;

    // Validation logic (if needed) can be done here

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
    const response = await addTenant(tenantData);

    return res.json({
      message: "Tenant added successfully",
      tenantId: response.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding tenant" });
  }
};
