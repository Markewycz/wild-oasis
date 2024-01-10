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

  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-accent px-10 py-6 rounded-md border border-border2 dark:border-border">
      <Tabs defaultValue="general" className="">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <CaretRightIcon />
          <TabsTrigger value="customer">Customer information</TabsTrigger>
          <CaretRightIcon />
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralInformationForm
            setFormState={setFormState}
            formState={formState}
          />
        </TabsContent>
        <TabsContent value="customer">
          <CustomerInformationForm />
        </TabsContent>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
      </Tabs>
      {/* <ButtonShadcn onClick={() => console.log(form)}>Form</ButtonShadcn> */}
    </div>
  );
}
