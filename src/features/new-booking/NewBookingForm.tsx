import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralInformationForm from './GeneralInformationForm';
import CustomerInformationForm from './CustomerInformationForm';
import Summary from './Summary';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useCreateBooking } from './useCreateBooking';
import { differenceInDays } from 'date-fns';
import { BREAKFAST_PRICE } from '@/utils/constants';

const FORM_STATE = {
  general: {},
  customer: {},
};

export default function NewBookingForm() {
  const { mutate, isCreatingBooking } = useCreateBooking();
  const [formState, setFormState] = useState(FORM_STATE);
  const [step, setStep] = useState('1');

  function handleCreateBooking() {
    const numNights = differenceInDays(
      formState.general.from,
      formState.general.to
    );

    const {
      general: {
        dateRange: { from: startDate, to: endDate },
        numGuests,
        cabin: { regularPrice, discount, id },
        observations,
        hasBreakfast,
      },
      customer: { nationalID, fullName, nationality },
    } = formState;
    console.log(cabin);

    const cabinPrice = regularPrice * numNights;
    const extrasPrice = numNights * BREAKFAST_PRICE;
    const totalPrice = cabinPrice + extrasPrice;
    const status = 'unconfirmed';
    const isPaid = true;
    // mutate();
  }

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-background px-10 py-6 rounded-md border border-border2 dark:border-border">
      <Tabs value={step}>
        <TabsList>
          <TabsTrigger value="1">General</TabsTrigger>
          <CaretRightIcon />
          <TabsTrigger value="2">Guest information</TabsTrigger>
          <CaretRightIcon />
          <TabsTrigger value="3">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <GeneralInformationForm
            setFormState={setFormState}
            setStep={setStep}
          />
        </TabsContent>
        <TabsContent value="2">
          <CustomerInformationForm
            setFormState={setFormState}
            setStep={setStep}
          />
        </TabsContent>
        <TabsContent value="3">
          <Summary formState={formState} />
        </TabsContent>
      </Tabs>
      {step === '3' && (
        <Button onClick={handleCreateBooking}>Create new booking</Button>
      )}
    </div>
  );
}
