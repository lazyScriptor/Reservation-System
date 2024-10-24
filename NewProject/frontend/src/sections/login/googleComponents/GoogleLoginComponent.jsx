import { GoogleLogin } from "react-google-login";

const clientId = "589651791757-105db6f0uo1bhqic1nuf9pfvva8qc5gm.apps.googleusercontent.com";

export default function GoogleLoginComponent() {
  const onSuccess = (res) => {
    console.log("Login Success: ", res.profileObj);
    // You can save the Google token or user details in localStorage or state here
  };

  const onFailure = (res) => {
    console.log("Login Failed: ", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
