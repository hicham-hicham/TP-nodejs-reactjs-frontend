import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import { Link , useNavigate} from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AuthService from "./services/auth.service";

const Detail = () => {

    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [BookDescription, setBookDescription] = useState('')
    const [quantite, setquantite] = useState()
    const [genre, setgenre] = useState()
    const [Image, setImage] = useState('')

    const [editions, setEditions] = useState([])
    const [editionTitle, seteditionTitle] = useState('')
    const [description, setDescription] = useState('')

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

    useEffect(() => {

        const getSingleBookData = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/livres/getBookEditions/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setBookDescription(data.description)
            setquantite(data.quantite)
            setgenre(data.genre)
            setImage(data.image)
            setEditions(data.edition)



        }
        getSingleBookData()

    },[id])
    const logOut = () => {
    AuthService.logout();
  };
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/livres/${id}`)
        
        navigate('/livre');
    }

    const addEditionHandler = async (e) => {

        e.preventDefault()

        let edition = {
            livreId: id,
            title: editionTitle,
            description: description
        }

        await axios.post(`http://localhost:8080/api/livres/addEdition/${id}`, edition)
        const getSingleBookData = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/livres/getBookEditions/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setBookDescription(data.description)
            setquantite(data.quantite)
            setgenre(data.genre)
            setImage(data.image)
            setEditions(data.edition)



        }
        getSingleBookData()
    }



    

    return (
        <>

        <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            details de livre
          </Typography>
          {currentUser? (
          <Typography variant="h6" color="inherit" sx={{marginLeft:"81%"}}>
            <Link to={`/`}>
                    <Button size="small" sx={{color:'white'}} onClick={logOut}>logout</Button>
                    </Link>
            
          </Typography>
          ):(<Typography variant="h6" color="inherit" sx={{marginLeft:"81%"}}>
            <Link to={`/`}>
                    <Button size="small" sx={{color:'white'}}>Login</Button>
                    </Link>
            
          </Typography>)}
        </Toolbar>
      </AppBar>

        <Container className="mt-10 p-4">
{currentUser? (
        <Row>
            <Col md={8} lg={8} sm={8}>
                <Card className='shadow-lg m-3 p-2 rounded'>
                        <Card.Img src={`http://localhost:8080/${Image}`} fluid height="300" />
                        <Card.Body>
                            <Card.Title>Title: {title}</Card.Title>
                            <Card.Title className="text-success">Price: ${price}</Card.Title>
                            <Card.Text>
                                Description: {BookDescription}
                            </Card.Text>
                            <Card.Text>
                                Genre : {genre}
                            </Card.Text>
                            <Card.Text>
                                quantite : {quantite}
                            </Card.Text>
                        <br />

                    
                            <Link to={`/edit/${id}`}>
                                {showAdminBoard && (
                                <Button>Edit</Button>
                                )}
                            </Link>
                            {showAdminBoard===false && showModeratorBoard===false && (
                    <Link to={"/livre"}>
                                {showuserBoard && (
                                <Button className="m-2">Commander</Button>
                                )}
                    </Link>
                    )}
                            {showAdminBoard && (
                            <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                    )}
                    </Card.Body>        
                </Card>
            </Col>

                <Col md={4} lg={4} sm={4}>

                    <h2 className='text-center'>{showAdminBoard && ("Add Edition")}</h2>
                    {showAdminBoard && (
                    <hr />
                    )}

                        <Form onSubmit={addEditionHandler}>
                            {showAdminBoard && (
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={editionTitle}
                                    onChange={(e) => seteditionTitle(e.target.value)}
                                    type="text"
                                />
                            </Form.Group>
                            )}
{showAdminBoard && (
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>
)}
{showAdminBoard && (

                            <Button variant="primary" type="submit">
                                Add Edition
                            </Button>
)}
                        </Form>

                         <br />
                                

                        <h5>Editions</h5>
                        <hr />

                        {editions.length > 0 ? (
                            editions.map(edition => {
                                return <p key={edition.id}>Edition : {edition.title} <br /> {edition.description}</p>
                            })
                        ): ( <p> No editions was found</p> )}

                        
                </Col>
        </Row>


):(<h2>You Don't Have Access To This Page</h2>)}
                
        </Container>

       



        </>
    )
}

export default Detail