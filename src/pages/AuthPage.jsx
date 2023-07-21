import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { Container, Row, Button, Modal, Form } from "react-bootstrap";
  import { useNavigate } from "react-router-dom";
  import { useContext, useState, useEffect } from "react";
  import { AuthContext } from "../components/AuthProvider";
  
  export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userUID, setUserUID] = useState(""); 
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext)
  
    useEffect(() => {
      if (currentUser) {
        navigate(`/main/${userUID}`); 
      }
    }, [currentUser, navigate, userUID]);
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      try {
        const res = await createUserWithEmailAndPassword(auth, username, password);
        const uid = res.user.uid; 
        setUserUID(uid); 
        console.log("User UID:", uid);
      } catch (error) {
        console.error(error);
      }
    };
    
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await signInWithEmailAndPassword(auth, username, password);
        const uid = res.user.uid; 
        setUserUID(uid); 
        console.log("User UID:", uid);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleClose = () => setModalShow(null);
  
    return (
      <Row
        className="justify-content-center align-items-center vh-100"
        style={{
          backgroundColor: "black",
          margin: 0,
          padding: 0,
        }}
      >
        <Container>
          <Row className="mb-4">
            <Container className="text-center">
              <h1 className="my-2 text-white font-weight-bold">
                Welcome to <span className="text-info-emphasis">UniClick</span>{" "}
                Booking System
              </h1>
            </Container>
          </Row>
          <Row>
            <Container className="d-flex justify-content-center">
              <Button onClick={handleShowSignUp} className="me-3">
                Sign Up
              </Button>
              <Button onClick={handleShowLogin}>Login</Button>
            </Container>
          </Row>
        </Container>
        <Modal
          show={modalShow !== null}
          onHide={handleClose}
          animation={false}
          centered
        >
          <Modal.Body className="d-grid gap-2 px-5">
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>
              {modalShow === "SignUp"
                ? "Create your account"
                : "Login to your account"}
            </h2>
            <Form onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
  
              <Button className="rounded-pill" type="submit">
                {modalShow === "SignUp" ? "Sign up" : "Log in"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Row>
    );
  }
  