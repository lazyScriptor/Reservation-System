import pool from "../databaseConnection.js";

export const getCourtTypeByTenantId = async (tenantId) => {
  try {
    const [response] = await pool.query(
      `SELECT courttype.court_type_id, courttype.type_name
       FROM courttype
       LEFT JOIN venue ON courttype.venue_id = venue.venue_id
       LEFT JOIN tenant ON venue.tenant_id = tenant.tenant_id
       WHERE tenant.tenant_id = ?`,
      [tenantId]
    );
    
    return response;
  } catch (error) {
    console.error("Error fetching court types by tenant ID:", error);
    throw new Error("Failed to fetch court types. Please try again later.");
  }
};
