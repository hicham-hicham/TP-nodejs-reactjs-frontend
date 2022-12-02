import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import { useNavigate} from 'react-router-dom'
import AuthService from "./services/auth.service";

const EditBook = () => {

    const { id } = useParams()


    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [quantite, setQuantite] = useState()
    const [genre, setgenre] = useState('')


    const navigate = useNavigate();
    useEffect(() => {
        const getDataById = async () => {
            const {data} = await axios.get(`http://localhost:8080/api/livres/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setQuantite(data.quantite)
            setgenre(data.genre)
        }

        getDataById()
    },[id])
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

   const updateHandler = async (e) => {

        e.preventDefault()

        const data = {
            title: title,
            price: price,
            description: description,
            quantite: quantite,
            genre: genre,
        }

        await axios.put(`http://localhost:8080/api/livres/${id}`, data)        
        navigate('/livre');

   }

    return (
        <>
            <Container className='mt-5 p-2'>
{showAdminBoard? (
                <Form onSubmit={updateHandler}>
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

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="quantite">
                        <Form.Label>quantite</Form.Label>
                        <Form.Control
                            value={quantite}
                            onChange={(e) => setQuantite(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="genre">
                        <Form.Label>genre</Form.Label>
                        <Form.Control
                            value={genre}
                            onChange={(e) => setgenre(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update Book
                    </Button>
                </Form>
                ):(<h2>You Don't Have Access To This Page</h2>)}
            </Container>
        </>
    )
}

export default EditBook