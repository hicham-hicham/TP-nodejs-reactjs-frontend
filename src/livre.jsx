import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import AuthService from "./services/auth.service";

const theme = createTheme();



const logOut = () => {
    AuthService.logout();
  };
export default function Livre() {
  const currentUser = AuthService.getCurrentUser();
  
  const [livres,setLivres] = useState([])

    useEffect(() => {
        const getBooksData = async () => {
            const { data } = await axios.get('http://localhost:8080/api/livres/allBooks')
            console.log(data)
            setLivres(data)
        }
        getBooksData()
    }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Liste des Livres
          </Typography>
          <Typography variant="h6" color="inherit" sx={{marginLeft:"35%"}}>
            Bonjour <strong>{currentUser.username}</strong>
          </Typography>
{currentUser? (
           <Typography variant="h6" color="inherit" sx={{marginLeft:"35%"}}>
            <Link to={`/`}>
                    <Button size="small" sx={{color:'white'}} onClick={logOut}>logout</Button>
                    </Link>
            
          </Typography>):(<Typography variant="h6" color="inherit" sx={{marginLeft:"35%"}}>
                        <Link to={`/`}>
                    <Button size="small">login</Button>
                    </Link>
          </Typography>)}
          
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Liste des Livres
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/add">
              <Button variant="contained">Ajouter livre</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {livres.map((livre) => (
              <Grid item key={livre} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 345 }}
                >
                  <CardMedia
                    component="img"
                    alt="image"
                    height="140"
                    sx={{objectFit:'scale-down'}}
                    image={`http://localhost:8080/${livre.image}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {livre.title}
                    </Typography>
                    <Typography>
                      {livre.description}
                    </Typography>
                    <Typography>
                      {livre.price} $
                    </Typography>
                    <Typography>
                      {livre.genre}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/details/${livre.id}`}>
                    <Button size="small">View Details</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          TP NodeJs, Express, ReactJs
        </Typography>
      </Box>
    </ThemeProvider>
  );
}