import pool from "../databaseConnection.js";

export const getUserCredentials = async (email) => {
  try {
    const [response] = await pool.query("SELECT * FROM users WHERE email =? ", [
      email,
    ]);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getBrandNames = async () => {
  try {
    const [response] = await pool.query(`
      SELECT users.tenant_id,users.first_name,users.email,tenant.tenant_name
      FROM tenant
      JOIN users
      ON users.tenant_id=tenant.tenant_id
      WHERE users.user_type='client' AND users.membership_status= 'active'
      `);
    return response;
  } catch (error) {
    throw error;
  }
};
export const addTenant = async (tenantData) => {
  try {
    const query = `
      INSERT INTO tenant (tenant_name, contact_person, contact_email, contact_phone, subscription_plan, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const {
      tenantName,
      contactPerson,
      contactEmail,
      contactPhone,
      subscriptionPlan,
      createdAt,
      updatedAt,
    } = tenantData;

    const [response] = await pool.query(query, [
      tenantName,
      contactPerson,
      contactEmail,
      contactPhone,
      subscriptionPlan,
      createdAt,
      updatedAt,
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};
export const addUser = async (userData) => {
  try {
    const query = `
      INSERT INTO users (tenant_id, first_name, last_name, email, phone_number, user_type, password, profile_photo, address, membership_status, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const {
      tenantId,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      password,
      profilePhoto,
      address,
      membershipStatus,
      role,
      createdAt,
      updatedAt,
    } = userData;

    const [response] = await pool.query(query, [
      tenantId,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      password,
      profilePhoto,
      address,
      membershipStatus,
      role,
      createdAt,
      updatedAt,
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};
