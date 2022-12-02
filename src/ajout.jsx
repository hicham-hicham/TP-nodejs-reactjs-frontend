import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AuthService from "./services/auth.service";


const AddBook = () => {


    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [quantite, setquantite] = useState()
    const [genre, setgenre] = useState('')
    const [image, setImage] = useState('')
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showuserBoard, setShowuserBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      if(showAdminBoard===false && showModeratorBoard===false){
        setShowuserBoard(true)
      }
    }
  }, []);

    const addBookHandler = async (e) => {

        e.preventDefault()

        const formData = new FormData()

        formData.append('image', image)
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('quantite', quantite)

        await axios.post('http://localhost:8080/api/livres/addBook', formData)
    
    }



    return (
        <>
        <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Ajouter un Livre
          </Typography>
        </Toolbar>
      </AppBar>
<br />
<br />
            <Container className='mt-5 p-2'>
                {showAdminBoard? (
                <Form onSubmit={addBookHandler} method="POST" encType='multipart/form-data'>

                <Form.Group controlId="fileName" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        name='image'
                        onChange={(e) => setImage(e.target.files[0])}
                        size="lg" />
                </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                          />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                             />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="quantite">
                        <Form.Label>quantite</Form.Label>
                        <Form.Control
                            value={quantite}
                            onChange={(e) => setquantite(e.target.value)}
                            type="number"
                             />
                    </Form.Group>

                  
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="genre">
                        <Form.Label>genre</Form.Label>
                        <Form.Control
                            value={genre}
                            onChange={(e) => setgenre(e.target.value)}
                            type="text"
                             />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Add Book
                    </Button>
                </Form>
                ):(<h2>You Don't Have Access To This Page</h2>)}
            </Container>
        </>
    )
}

export default AddBook