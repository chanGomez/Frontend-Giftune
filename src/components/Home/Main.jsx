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


function Main() {
  const navigate = useNavigate()
  return (
    <Container sx={{ py: 11 }} >
    <Grid container>
        <Grid
          xs={6}
          sx={{ py: 10 }}
          item={true}
        >
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
            Gift what they love to who you love.
          </Typography>
          <Typography variant="h6" color="inherit" paragraph>
          An app designed to keep you on top of your loved ones upcoming
          birthdays, where you can effortlessly select the perfect gift.
          </Typography>
          <Link variant="subtitle1" href="#">
          <Button variant="contained" color="primary" sx={{ flexShrink: 0 , width: 120, height: 50, mt: 2}}
          onClick={() => {navigate("/sign-up")}}
          >
                SIGN UP
              </Button>
          </Link>
        </Grid>
        <Grid xs={6} item={true}>
        <img src={marketingImage} alt={"marketingImage"}  style={{ width: 600}}/>
        </Grid>
    </Grid>
    </Container>


  )
}

export default Main