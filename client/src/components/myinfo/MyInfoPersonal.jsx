import { Divider, Box,  } from '@mui/material'
import React from 'react'
import { List, ListItem, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {

    h2: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '16px',
      color: '#344054',
      marginTop:'20px',
      marginBottom:'13px',
    },
   
    body1: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#344054',
    },

    body2: {
      fontWeight: 400,
      fontFamily:'Inter',
      fontSize: '13px',
      color: '#344054',
    },
   
  },

  
});

function MyInfoPersonal({employee}) {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box>
          <List>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Предпочтительное имя:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.preferredName}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Пол:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.gender}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Национальность:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.nationality}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Дата рождения:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{new Date(employee.dateOfBirth).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric'})}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Семейное положение:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.maritalStatus}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          </List>
        </Box>
        <Typography variant="h2">Адрес</Typography>
        <Divider></Divider>
        <Box>
          <List>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Улица:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.streetAddress}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Город:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.city}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem sx={{paddingLeft:'0px'}}>
              <Grid container spacing={-35}>
                <Grid item xs={6}>
                  <Typography variant="body1">Страна:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{employee.country}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Box>
      </ThemeProvider>
    </Box>
  )
}

MyInfoPersonal.propTypes = {}

export default MyInfoPersonal
