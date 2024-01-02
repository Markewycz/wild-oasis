import Form from '../../ui/Form';
import 'react-calendar/dist/Calendar.css';
import { DatePickerWithRange } from '@/ui/DatePickerWithRange';
import { SelectNumGuests } from '@/ui/SelectNumGuests';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useState } from 'react';
import { useBookingsRange } from './useBookingsRange';
import { datesFromDate } from '@/utils/helpers';
import { useCabins } from '../cabins/useCabins';
import Menus from '@/ui/Menus';
import Table from '@/ui/Table';
import CabinRow from '../cabins/CabinRow';
import Spinner from '@/ui/Spinner';
import { ButtonLoading } from '@/ui/ButtonLoading';
import SpinnerMini from '@/ui/SpinnerMini';

export default function NewBookingForm() {
  const [range, setRange] = useState();
  const [numGuests, setNumGuests] = useState();
  const { bookings, isLoading, isRefetching, refetch } = useBookingsRange(
    range ? range?.from : new Date()
  );
  const { cabins } = useCabins();
  const [freeCabins, setFreeCabins] = useState();

  function getAvailableCabins() {
    bookings?.map(booking => {
      booking.rangeDays = datesFromDate(booking.startDate, booking.numNights);
    });

    const availableCabinsId = [
      ...new Set(
        bookings
          ?.filter(booking => {
            const isDateInRange = range?.range?.some(selectedDate => {
              return booking.rangeDays.includes(selectedDate);
            });

            return !isDateInRange;
          })
          .map(booking => booking.cabinId)
      ),
    ];

    const availableCabins = cabins.filter(cabin => {
      return (
        availableCabinsId.includes(cabin.id) && numGuests <= cabin.maxCapacity
      );
    });

    setFreeCabins(availableCabins);
  }

  function handleSearch(e) {
    e.preventDefault();
    refetch();
    getAvailableCabins();
  }

  return (
    <Form>
      <div className='flex flex-col gap-6'>
        <div className="flex justify-between gap-2">
          <div className="flex gap-4">
            <DatePickerWithRange setRange={setRange} />
            <SelectNumGuests setNumGuests={setNumGuests} />
          </div>
          <div className="flex gap-2">
            <ButtonShadcn variant="outline">Reset</ButtonShadcn>
            {!isRefetching ? (
              <ButtonShadcn onClick={handleSearch}>Search</ButtonShadcn>
            ) : (
              <ButtonLoading />
            )}
          </div>
        </div>

        {freeCabins && (
          <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
              <Table.Body
                data={freeCabins}
                render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
              />
            </Table>
          </Menus>
        )}
      </div>
    </Form>
  );
}
