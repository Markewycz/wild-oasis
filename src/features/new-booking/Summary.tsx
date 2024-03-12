import Divider from '@/ui/Divider';
import SummaryCheckbox from '@/ui/SummaryCheckbox';
import SummaryInput from '@/ui/SummaryInput';
import SummaryTextarea from '@/ui/SummaryTextarea';
import SummaryCabin from '@/ui/SummaryCabinTable';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import BookingDialog from '@/ui/BookingDialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function Summary({
  formState,
  handleCreateBooking,
  setFormState,
  isCreatingBooking,
}) {
  const form = useForm({
    defaultValues: {
      isPaid: '',
    },
  });

  const [isPaidSet, setIsPaidSet] = useState<boolean>();
  const isPaid = form.getValues('isPaid');
  const queryClient = useQueryClient();

  const {
    general: {
      dateRange: { from, to },
      numGuests,
      cabin,
      observations,
      hasBreakfast,
    },
    customer: { nationalID, fullName, nationality },
  } = formState;

  const handleForm = () => {
    setFormState(formState => ({
      ...formState,
      summary: {
        isPaid: form.getValues('isPaid') === 'true' ? true : false,
      },
    }));
  };

  const submitForm = () => {
    queryClient.invalidateQueries({ queryKey: [nationalID] });
    handleForm();
    handleCreateBooking();
  };

  useEffect(() => {
    setIsPaidSet(isPaid ? true : false);
  }, [isPaid]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForm)}>
        <div className="flex flex-col gap-6">
          <div>
            <Divider label="Trip details" />
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <SummaryInput
                  label="Check in"
                  value={format(from, 'dd.MM.yyyy')}
                />
                <SummaryInput
                  label="Check out"
                  value={format(to, 'dd.MM.yyyy')}
                />
                <SummaryInput label="Number of guests" value={numGuests} />
              </div>

              <SummaryCabin cabin={cabin} />

              <SummaryTextarea label="Observations" value={observations} />
              <SummaryCheckbox value={hasBreakfast} />
            </div>
          </div>

          <div>
            <Divider label="Guest details" />
            <div className="grid grid-cols-3 gap-2">
              <SummaryInput label="National ID" value={nationalID} />
              <SummaryInput label="Full name" value={fullName} />
              <SummaryInput label="Nationality" value={nationality} />
            </div>
          </div>

          <FormField
            control={form.control}
            name="isPaid"
            rules={{
              required: 'This field is required',
            }}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">
                  Has the reservation been paid?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-2 rounded-full focus:outline-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          value="true"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="false"
                          className="border-2 rounded-full focus:outline-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <BookingDialog
              isPaidSet={isPaidSet}
              submitForm={submitForm}
              isCreatingBooking={isCreatingBooking}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
