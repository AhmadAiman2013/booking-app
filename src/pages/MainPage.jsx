import { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import NewModalPage from './NewModalPage';
import UpdateModalPage from './UpdateModalPage';
import { useParams } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooking } from '../features/bookings/bookingsSlice';
import { fetchAllBooking } from '../features/bookings/bookingsSlice';
import { deleteBooking } from '../features/bookings/bookingsSlice';


export default function MainPage() {
  const [show, setShow] = useState(false);
  const [newShow, setNewShow] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { userID } = useParams();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userID == 'zUaz0KE5eBP59WqozkjTt61l6dr1') {
      dispatch(fetchAllBooking(userID))
    } else {
      dispatch(fetchBooking(userID));
    }
    dispatch(fetchBooking(userID));
  }, [dispatch, userID]);

  const bookings = useSelector((state) => state.bookings.bookings);
  const loading = useSelector((state) => state.bookings.loading);

  const handleClose = () => setNewShow(false);
  const handleShow = () => setNewShow(true);

  const handleEditClose = () => {
    setShow(false);
    setSelectedBookingId(null);
  };

  const handleEditShow = (id) => {
    setShow(true);
    setSelectedBookingId(id); // Set the selected booking ID when opening the modal
  };
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  

  const handleDelete = (id) => {
    dispatch(deleteBooking(id)).then(() => {
      dispatch(fetchBooking(userID));
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  
  return (
    <Container className="dashboard-container">
      <Row className="d-flex align-items-center">
        <Col>
          <h1 className="mt-4">Dashboard</h1>
        </Col>
        <Col>
          <Button variant="danger" className="ms-3 float-end" onClick={handleLogout}>
            Sign Out
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <h2>Upcoming Bookings</h2>
          {loading ? (
            <h4>Loading...</h4>
          ) : bookings.length === 0 ? (
            <h5 className="text-danger">No Booking</h5>
          ) : (
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              {bookings.map((booking) => (
                <Accordion.Item key={booking.id} eventKey={booking.id}>
                  {/* Use inline style for the Accordion.Header */}
                  <Accordion.Header>{booking.title}</Accordion.Header>
                  <Accordion.Body>
                    <p>{booking.description}</p>
                    <p>{formatDate(booking.date)}</p>
                    <p>{formatTime(booking.time)}</p>
                    <p>{booking.phone}</p>
                    <p>{booking.email}</p>
                    <Button variant="warning" className="me-2" onClick={() => handleEditShow(booking.id)} >
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(booking.id)}>
                      Delete
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          <Button className="mt-3 bg-primary" onClick={handleShow}>
            New Booking
          </Button>
          <NewModalPage show={newShow} handleClose={handleClose} />
          <UpdateModalPage show={show} handleClose={handleEditClose} id={selectedBookingId}/>
        </Col>
        <Col md={6}>
          Hello
        </Col>
      </Row>
    </Container>
  );
}
