import 'react-calendar/dist/Calendar.css';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralInformationForm from './GeneralInformationForm';
import CustomerInformationForm from './CustomerInformationForm';
import Summary from './Summary';
import { CaretRightIcon } from '@radix-ui/react-icons';

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
  const [formState, setFormState] = useState(FORM_STATE);
  const [step, setStep] = useState('1');

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-background px-10 py-6 rounded-md border border-border2 dark:border-border">
      <Tabs defaultValue="1" value={step} className="">
        <TabsList>
          <TabsTrigger value="1">General</TabsTrigger>
          <CaretRightIcon />
          <TabsTrigger value="2">Customer information</TabsTrigger>
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
          <CustomerInformationForm setStep={setStep} />
        </TabsContent>
        <TabsContent value="3">
          <Summary />
        </TabsContent>
      </Tabs>
      {/* <ButtonShadcn onClick={() => console.log(form)}>Form</ButtonShadcn> */}
    </div>
  );
}
