import React from 'react'
import { Divider, Box,  } from '@mui/material'
import { List, ListItem, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  typography: {

    h2: {
      fontWeight: 600,
      fontFamily:'Inter',
      fontSize: '16px',
      color: '#344054',
      marginTop:'55px',
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


function MyInfoJob({employee}) {
  return (
    <Box>
       <ThemeProvider theme={theme}>
        <Box>
          <List>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6} >
                <Typography variant="body1">Дата приема:</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="body2">{new Date(employee.hireDate).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long', day: 'numeric'})}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Должность:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.role.roleTitle}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Офис:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.officeLocation}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{paddingLeft:'0px'}}>
            <Grid container spacing={-35}>
              <Grid item xs={6}>
                <Typography variant="body1">Тип сотрудника:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{employee.employmentType}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          </List>
        </Box>
       </ThemeProvider>
    </Box>
  )
}

MyInfoJob.propTypes = {}

export default MyInfoJob
