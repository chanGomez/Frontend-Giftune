import React from 'react'
import FirebaseLogin from "../Auth/FirebaseLogin/Login"
import Container from "@mui/material/Container";
import './Modal.css'

function Modal() {
  return (
        <Container id="modal" sx={{ py: { xs: 8, sm: 16 } }}>
            <FirebaseLogin/>
        </Container>
  )
}

export default Modal