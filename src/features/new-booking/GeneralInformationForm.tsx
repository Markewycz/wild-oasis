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

export default function GeneralInformationForm({
  setNumGuests,
  setRange,
  isRefetching,
  freeCabins,
  setSelectedCabin,
  selectedCabin,
  handleSearch,
  setForm,
  setSearchArgs,
}) {
  const form = useForm({
    defaultValues: {
      dateRange: '',
      numGuests: '',
    },
  });

  // const onSubmit = data => console.log(data);

  function onSearch() {
    handleSearch();

    setForm(formState => ({
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

          {!isRefetching && freeCabins && (
            <FreeCabinTable
              freeCabins={freeCabins}
              setSelectedCabin={setSelectedCabin}
            />
          )}

          {selectedCabin && (
            <>
              <FormField
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special requirements/comments</FormLabel>
                    <FormControl>
                      <Textarea placeholder="I will come with a small dog. Please prepare two bowls for him." />
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

        <div className="flex gap-2">
          <ButtonShadcn variant="outline" onClick={form.reset}>
            Reset
          </ButtonShadcn>
          <ButtonShadcn>Search</ButtonShadcn>
        </div>
      </form>
    </Form>
  );
}
