import NewBookingForm from '../features/bookings/NewBookingForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

export default function NewBooking() {
  return (
    <Row>
      <Heading as="h1">New booking</Heading>
      <NewBookingForm />
    </Row>
  );
}
