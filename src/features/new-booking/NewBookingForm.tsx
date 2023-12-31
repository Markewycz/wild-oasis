import Form from '../../ui/Form';
import 'react-calendar/dist/Calendar.css';
import { DatePickerWithRange } from '@/ui/DatePickerWithRange';
import { SelectNumGuests } from '@/ui/SelectNumGuests';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useState } from 'react';
import { addDays, format, subDays } from 'date-fns';
import { useBookingsRange } from './useBookingsRange';

export default function NewBookingForm() {
  const [range, setRange] = useState();
  const { bookings } = useBookingsRange(new Date());

  function generateRangeOfDates(startDate, days) {
    const dateArray = [];

    for (let i = -days; i <= days; i++) {
      const currentDate =
        i < 0 ? subDays(startDate, Math.abs(i)) : addDays(startDate, i);
      dateArray.push(format(currentDate, 'yyyy.MM.dd'));
    }

    return dateArray;
  }

  return (
    <Form>
      <div className="flex justify-between gap-2">
        <div className="flex gap-4">
          <DatePickerWithRange setRange={setRange} />
          <SelectNumGuests />
        </div>
        <div className="flex gap-2">
          <ButtonShadcn variant="outline">Reset</ButtonShadcn>
          <ButtonShadcn>Search</ButtonShadcn>
        </div>
      </div>
    </Form>
  );
}
