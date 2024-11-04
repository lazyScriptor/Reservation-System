export const decodeToken = (token) => {
  
  try {
    // Split the token into its parts
    const [header, payload, signature] = token.split(".");
    
    if (!header || !payload) {
      throw new Error("Invalid token format");
    }

    // Decode the Base64Url encoded parts
    const decodeBase64Url = (str) => {
      // Replace URL-safe characters and add padding if necessary
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
      return atob(paddedBase64);
    };

    const decodedHeader = JSON.parse(decodeBase64Url(header));
    const decodedPayload = JSON.parse(decodeBase64Url(payload));


    return { header: decodedHeader, payload: decodedPayload.data, signature };
  } catch (error) {
    console.error("Token decoding failed:", error);
    return null;
  }
};
