import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralInformationForm from './GeneralInformationForm';
import CustomerInformationForm from './CustomerInformationForm';
import Summary from './Summary';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { useCreateBooking } from './useCreateBooking';
import { differenceInDays, format } from 'date-fns';
import { BREAKFAST_PRICE } from '@/utils/constants';
import { useGuestNationalID } from './useGuestNationalID';

type FormType =
  | {
      general: {
        dateRange: { from: Date; to: Date };
        numGuests: number;
        cabin: { regularPrice: number; discount: number; id: number };
        observations: string;
        hasBreakfast: boolean;
      };
      customer: {
        nationalID: number;
        fullName: string;
        nationality: string;
      };
      summary: {
        isPaid: boolean;
      };
    }
  | {
      general: Record<string, never>;
      customer: Record<string, never>;
      summary: Record<string, never>;
    };

const FORM_STATE: FormType = {
  general: {},
  customer: {},
  summary: {},
};

export default function NewBookingForm() {
  const [formState, setFormState] = useState(FORM_STATE);
  const [step, setStep] = useState('1');
  const { mutate, isCreatingBooking } = useCreateBooking(setStep);
  const { guest } = useGuestNationalID(formState.customer.nationalID);

  function handleCreateBooking() {
    const {
      general: {
        dateRange: { from, to },
        numGuests,
        cabin: { regularPrice, discount, id: cabinId },
        observations,
        hasBreakfast,
      },
      summary: { isPaid },
    } = formState;

    const startDate = from;
    const endDate = to;
    const numNights = Math.abs(differenceInDays(from, to));
    const cabinPrice = regularPrice * numNights;
    const extrasPrice = numNights * BREAKFAST_PRICE;
    const totalPrice = cabinPrice + extrasPrice - discount;
    const status = 'unconfirmed';
    const { id: guestId } = guest[0];

    const newBooking = {
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
      hasBreakfast,
      isPaid,
      observations,
      cabinId,
      guestId,
    };

    mutate(newBooking);
  }

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-background px-10 py-6 rounded-md border border-border2 dark:border-border">
      <Tabs className="relative" value={step}>
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
            formState={formState}
          />
        </TabsContent>
        <TabsContent value="2">
          <CustomerInformationForm
            setFormState={setFormState}
            setStep={setStep}
          />
        </TabsContent>
        <TabsContent value="3">
          <Summary
            isCreatingBooking={isCreatingBooking}
            setFormState={setFormState}
            formState={formState}
            handleCreateBooking={handleCreateBooking}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
