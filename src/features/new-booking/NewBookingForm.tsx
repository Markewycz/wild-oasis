import 'react-calendar/dist/Calendar.css';
import { DatePickerWithRange } from '@/ui/DatePickerWithRange';
import { SelectNumGuests } from '@/ui/SelectNumGuests';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useState } from 'react';
import { useBookingsRange } from './useBookingsRange';
import { datesFromDate } from '@/utils/helpers';
import { useCabins } from '../cabins/useCabins';
import { ButtonLoading } from '@/ui/ButtonLoading';
import { SkeletonLoading } from '@/ui/Skeleton';
import FreeCabinTable from './FreeCabinTable';
import * as z from 'zod';
import UserForm from './UserForm';

// const formSchema = z.object({
//   startDate,
//   endDate,
//   numGuests,
//   cabinId,
// });

export default function NewBookingForm() {
  const [range, setRange] = useState();
  const [numGuests, setNumGuests] = useState();
  const { bookings, isLoading, isRefetching, refetch } = useBookingsRange(
    range ? range?.from : new Date()
  );
  const { cabins } = useCabins();
  const [freeCabins, setFreeCabins] = useState();
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [nextStep, setNextStep] = useState(false);

  function getAvailableCabins() {
    // 1) Get all cabin id's
    const cabinsId: number[] = [];
    cabins.forEach(cabin => cabinsId.push(cabin.id));

    // 2) Create rangeDays inside booking to further use it to filter finished, ongoing and future bookings
    bookings?.map(booking => {
      booking.rangeDays = datesFromDate(booking.startDate, booking.numNights);
    });

    // 3) Filter all cabins and return occupied cabin id's
    const occupiedCabinsId = [
      ...new Set(
        bookings
          .filter(booking => {
            return !(new Date(booking.endDate) < new Date());
          })
          .filter(booking => {
            const isDateInRange = range?.range?.some(selectedDate => {
              return booking.rangeDays.includes(selectedDate);
            });
            return isDateInRange;
          })
          .map(booking => booking.cabinId)
      ),
    ];

    // 4) Remove occupied cabin id's from list of all cabin id's
    const availableCabinsId = cabinsId.filter(
      cabinId => !occupiedCabinsId.includes(cabinId)
    );

    // 5) Using availableCabinId's get corresponding cabin objects
    const availableCabins = cabins.filter(cabin => {
      return (
        availableCabinsId.includes(cabin.id) && numGuests <= cabin.maxCapacity
      );
    });

    // 6) Set FreeCabins to State
    setFreeCabins(availableCabins);
  }

  function handleSearch(e) {
    e.preventDefault();

    refetch();
    getAvailableCabins();
  }

  function handleNextStep(e) {
    e.preventDefault();
    setNextStep(true);
  }

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-accent px-10 py-6 rounded-md border border-border2 dark:border-border">
      <div className="flex gap-4">
        <DatePickerWithRange setRange={setRange} />
        <SelectNumGuests setNumGuests={setNumGuests} />
      </div>

      {isRefetching && (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}

      {!isRefetching && freeCabins && (
        <FreeCabinTable
          freeCabins={freeCabins}
          setSelectedCabin={setSelectedCabin}
        />
      )}

      {nextStep && <UserForm />}

      <div className="flex gap-2">
        <ButtonShadcn variant="outline">Reset</ButtonShadcn>

        {!isRefetching && !selectedCabin && (
          <ButtonShadcn onClick={handleSearch}>Search</ButtonShadcn>
        )}
        {!isRefetching && selectedCabin && (
          <ButtonShadcn onClick={handleNextStep}>Next</ButtonShadcn>
        )}
        {isRefetching && <ButtonLoading />}
      </div>
    </div>
  );
}
