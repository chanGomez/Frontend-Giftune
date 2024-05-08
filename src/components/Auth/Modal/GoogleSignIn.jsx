import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


function GoogleSignIn() {

  const onGoogleSignIn = async (e) => {
    signInWithPopup(auth, provider).then((result)=> {
      const userData = result.user
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(`/dashboard/`);
      console.log(userData.displayName);
    }).catch((e)=>{
      console.log(e)
    })
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Sign In with google
      </Typography>
      <Button onClick={onGoogleSignIn}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          GOOGLE
        </Typography>
      </Button>
    </>
  );
}

export default GoogleSignIn