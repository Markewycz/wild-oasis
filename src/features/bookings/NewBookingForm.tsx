import Calendar from 'react-calendar';
import Form from '../../ui/Form';
import 'react-calendar/dist/Calendar.css';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { DatePickerWithRange } from '@/ui/DatePickerWithRange';
import { SelectNumGuests } from '@/ui/SelectNumGuests';

const StyledCalendar = styled.div`
  position: absolute;

  left: ${props => {
    if (!props.position) return null;
    return props.position.x;
  }}px;
  top: ${props => {
    if (!props.position) return null;
    return props.position.y;
  }}px;
`;

const BookingInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

const InputDate = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem 0.75rem;
`;

const InputSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem 0.75rem;
`;
const InputOption = styled.option`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.25rem 0.5rem;
`;

export default function NewBookingForm() {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  function handleDatePick(value) {
    if (isCheckInOpen) setCheckIn(format(value, 'dd-MM-yyyy'));
    if (isCheckOutOpen) setCheckOut(format(value, 'dd-MM-yyyy'));
  }

  function handleCheckinDate(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: rect.x,
      y: rect.y + rect.height + 8,
    });

    setIsCheckOutOpen(false);
    setIsCheckInOpen(prev => !prev);
  }

  function handleCheckoutDate(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: rect.x,
      y: rect.y + rect.height + 8,
    });

    setIsCheckInOpen(false);
    setIsCheckOutOpen(prev => !prev);
  }

  return (
    <Form>
      <div className="flex gap-4">
        <DatePickerWithRange />
        <SelectNumGuests />
      </div>
      {/* <BookingInputContainer>
        <FormColumn>
          <label htmlFor="check-in">Check-in</label>
          <InputDate
            id="check-in"
            type="text"
            readOnly
            value={checkIn || format(new Date(), 'dd-MM-yyyy')}
            onClick={handleCheckinDate}
          />
        </FormColumn>

        <FormColumn>
          <label htmlFor="check-out">Check-out</label>
          <InputDate
            id="check-out"
            type="text"
            readOnly
            value={checkOut || format(addDays(new Date(), 1), 'dd-MM-yyyy')}
            onClick={handleCheckoutDate}
          />
        </FormColumn>

        <FormColumn>
          <label htmlFor="num-guests">Number of guests</label>
          <InputSelect>
            <InputOption selected value="1">
              1
            </InputOption>
            <InputOption value="2">2</InputOption>
            <InputOption value="3">3</InputOption>
            <InputOption value="4">4</InputOption>
            <InputOption value="5">5</InputOption>
            <InputOption value="6">6</InputOption>
            <InputOption value="7">7</InputOption>
            <InputOption value="8">8</InputOption>
            <InputOption value="9">9</InputOption>
            <InputOption value="10">10</InputOption>
          </InputSelect>
        </FormColumn>

        {(isCheckInOpen || isCheckOutOpen) && (
          <StyledCalendar position={position}>
            <Calendar onChange={handleDatePick} />
          </StyledCalendar>
        )}
      </BookingInputContainer> */}

      <FormRow>
        <Button variation="secondary">Reset</Button>
        <Button>Search</Button>
      </FormRow>
    </Form>
  );
}
