import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import marketingImage from '../../Assets/marketing-image.png'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from "../Auth/LogIn/GoogleSignIn";
import { Modal } from "@mui/material";



const style = {
  backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #e5dcea 100%)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 14,
  p: 4,
  borderRadius: 3,
  // padding: 5
};


function Main() {
  const navigate = useNavigate();

  //modal-----
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal styles
  const style = {
    backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #e5dcea 100%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 14,
    p: 4,
    borderRadius: 3,
    // padding: 5
  };

  return (
    <Container sx={{ py: 11 }}>
      <Grid container>
        <Grid xs={6} sx={{ py: 10 }} item={true}>
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
            Gift what they love to who you love.
          </Typography>
          <Typography variant="h6" color="inherit" paragraph>
            An app designed to keep you on top of your loved ones upcoming
            birthdays, where you can effortlessly select the perfect gift.
          </Typography>
          <Link variant="subtitle1">
            <Button
              variant="contained"
              color="primary"
              sx={{
                flexShrink: 0,
                width: 120,
                height: 50,
                mt: 2,
                boxShadow: "none",
              }}
              onClick={handleOpen}
            >
              SIGN UP
            </Button>
            {open && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ borderRadius: 20 }}
              >
                <Box sx={style}>
                  {/* if login successfull && and user.firstTimeLogin is false then do questionaire */}
                  {/* {user ? (
                    user.emailVerified === true &&
                    user.firstTimeLogin === true ? (
                      <Questionnaire />
                    ) : (
                      navigate(`/dashboard/${user.id}`)
                    )
                  ) : ( */}
                  <GoogleSignIn
                    setOpen={setOpen}
                    handleClose={handleClose}
                  />
                  {/* )} */}
                </Box>
              </Modal>
            )}
          </Link>
        </Grid>
        <Grid xs={6} item={true}>
          <img
            src={marketingImage}
            alt={"marketingImage"}
            style={{ width: 600 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Main