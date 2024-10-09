import { GoogleLogout } from "react-google-login";

const clientId =
  "589651791757-105db6f0uo1bhqic1nuf9pfvva8qc5gm.apps.googleusercontent.com";
export default function Logout() {
  const onSuccess = () => {
    console.log("Logout successful");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Login"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
