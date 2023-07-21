import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../features/bookings/bookingsSlice';

export default function UpdateModalPage({ show, handleClose, id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();



  // Get the existing booking data from Redux store
  const existingBooking = useSelector((state) =>
    state.bookings.bookings.find((booking) => booking.id === id)
  );

  useEffect(() => {
    // Set the form fields with existing booking data when the modal is opened
    if (show && existingBooking) {
      setTitle(existingBooking.title || '');
      setDescription(existingBooking.description || '');
      setDate(existingBooking.date ? new Date(existingBooking.date) : null);
      setTime(existingBooking.time ? new Date(`1970-01-01T${existingBooking.time}`) : null);
      setPhone(existingBooking.phone || '');
      setEmail(existingBooking.email || '');
    }
  }, [show, existingBooking]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
    const formattedTime = time ? format(time, 'HH:mm:ss') : null;

    const formData = {
      id: id,
      title: title,
      description: description,
      date: formattedDate,
      time: formattedTime,
      phone: phone,
      email: email,
    };

    console.log(formData);
    dispatch(updateBooking({ id: id, formData: formData }));

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <br />
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <br />
            <DatePicker
              selected={time}
              onChange={(time) => setTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-2" variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
