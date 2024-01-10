import { DatePickerWithRange } from '@/ui/DatePickerWithRange';
import { SelectNumGuests } from '@/ui/SelectNumGuests';
import { SkeletonLoading } from '@/ui/Skeleton';
import FreeCabinTable from './FreeCabinTable';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useState } from 'react';
import { useCabins } from '../cabins/useCabins';
import { useBookingsRange } from './useBookingsRange';
import { datesFromDate } from '@/utils/helpers';

export default function GeneralInformationForm({ setFormState, formState }) {
  const defaultValues = {
    dateRange: '',
    numGuests: '',
    observations: '',
    hasBreakfast: false,
  };

  const form = useForm({
    defaultValues: defaultValues,
  });

  const [searchArgs, setSearchArgs] = useState({});
  const { cabins } = useCabins();
  const { bookings, isRefetching, refetch } = useBookingsRange(new Date());

  const [freeCabins, setFreeCabins] = useState();
  const [selectedCabin, setSelectedCabin] = useState();
  const [inputChanged, setInputChanged] = useState();

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

  function onSearch() {
    refetch();
    getAvailableCabins();

    setInputChanged(false);
    setFormState(formState => ({
      ...formState,
      steps: {
        ...formState.steps,
        general: {
          ...formState.steps.general,
          values: form.getValues(),
        },
      },
    }));
  }

  function nextStep() {}

  function resetForm() {
    form.reset();
    form.clearErrors();
    setInputChanged(true);
    setSelectedCabin(null);
  }

  function isInputChanged() {
    setInputChanged(true);
    setSelectedCabin(null);
    form.resetField('hasBreakfast');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check in/out</FormLabel>
                  <DatePickerWithRange
                    setSearchArgs={setSearchArgs}
                    isInputChanged={isInputChanged}
                    field={field}
                    {...form.register('dateRange', {
                      required: 'This field is required',
                    })}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numGuests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of guests</FormLabel>
                  <FormControl>
                    <SelectNumGuests
                      setSearchArgs={setSearchArgs}
                      isInputChanged={isInputChanged}
                      field={field}
                      {...form.register('numGuests', {
                        required: 'This field is required',
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isRefetching && <SkeletonLoading times={3} />}

          {!isRefetching && freeCabins && !inputChanged && (
            <FreeCabinTable
              freeCabins={freeCabins}
              setSelectedCabin={setSelectedCabin}
            />
          )}

          {selectedCabin && !inputChanged && (
            <>
              <FormField
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special requirements/comments</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        {...form.register('observations')}
                        placeholder="I will come with a small dog. Please prepare two bowls for him."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hasBreakfast"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...form.register('hasBreakfast')}
                      />
                    </FormControl>
                    <div className="grid gap-1.5 leading-none">
                      <FormLabel>Include breakfast?</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Additional $25 per person
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <ButtonShadcn variant="outline" type="reset" onClick={resetForm}>
            Reset
          </ButtonShadcn>

          {(!selectedCabin || inputChanged) && (
            <ButtonShadcn>Search</ButtonShadcn>
          )}

          {selectedCabin && !inputChanged && (
            <ButtonShadcn onClick={nextStep}>Next</ButtonShadcn>
          )}
        </div>
      </form>
    </Form>
  );
}
