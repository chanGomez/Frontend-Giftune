import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

function Main() {

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
    <Box
      height={200}
      width={800}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
    //   sx={{ border: '2px solid grey' }}
    >
    <Typography variant="h1" gutterBottom sx={{fontWeight: 500}}>
        Give what they love to who you love.
      </Typography>
    </Box>
        <Box>

        </Box>
    </Container>
  )
}

export default Main