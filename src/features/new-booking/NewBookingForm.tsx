import 'react-calendar/dist/Calendar.css';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useState } from 'react';
import { useBookingsRange } from './useBookingsRange';
import { datesFromDate } from '@/utils/helpers';
import { useCabins } from '../cabins/useCabins';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralInformationForm from './GeneralInformationForm';
import CustomerInformationForm from './CustomerInformationForm';
import Summary from './Summary';

const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    general: {
      values: {},
    },
    customer: {
      values: {},
    },
    summary: {
      values: {},
    },
  },
};

export default function NewBookingForm() {
  const [form, setForm] = useState(FORM_STATE);
  const [searchArgs, setSearchArgs] = useState({});

  const { bookings, isLoading, isRefetching, refetch } = useBookingsRange(
    new Date()
  );

  const { cabins } = useCabins();
  const [freeCabins, setFreeCabins] = useState();
  const [selectedCabin, setSelectedCabin] = useState(null);
  console.log(searchArgs);

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
            const isDateInRange = searchArgs?.rangeDate.rangeDays.some(
              selectedDate => {
                return booking.rangeDays.includes(selectedDate);
              }
            );
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
        availableCabinsId.includes(cabin.id) &&
        searchArgs.numGuests <= cabin.maxCapacity
      );
    });

    // 6) Set FreeCabins to State
    setFreeCabins(availableCabins);
    console.log(availableCabins);
  }

  function handleSearch(e: React.MouseEvent<HTMLButtonElement>) {
    refetch();
    getAvailableCabins();
  }

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-accent px-10 py-6 rounded-md border border-border2 dark:border-border">
      <Tabs defaultValue="general" className="">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="customer">Customer information</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralInformationForm
            isRefetching={isRefetching}
            setSelectedCabin={setSelectedCabin}
            freeCabins={freeCabins}
            selectedCabin={selectedCabin}
            handleSearch={handleSearch}
            setForm={setForm}
            setSearchArgs={setSearchArgs}
          />
        </TabsContent>
        <TabsContent value="customer">
          <CustomerInformationForm />
        </TabsContent>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
      </Tabs>
      <ButtonShadcn onClick={() => console.log(form)}>Form</ButtonShadcn>
    </div>
  );
}
