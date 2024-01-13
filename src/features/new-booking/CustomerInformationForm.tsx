import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ButtonShadcn } from '@/ui/ButtonShadcn';
import { useForm } from 'react-hook-form';
import { useGuests } from './useGuests';
import { useCreateGuest } from './useCreateGuest';
import SelectCountries from '@/ui/SelectCountries';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { useSortedCountries } from './useSortedCountries';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export default function CustomerInformationForm({ setStep, setFormState }) {
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { mutate, isLoading: isCreatingGuests } = useCreateGuest();
  const { sortedCountries, isLoading: isLoadingCountries } =
    useSortedCountries();
  const form = useForm();

  const [guestValidation, setGuestValidation] = useState({});

  /* <SelectCountries
              field={field}
              {...form.register('nationality', {
                required: 'Nationality is required',
              })}
            /> */

  function isGuestInDatabase() {
    const nationalIDToFind = form.getValues().nationalID;
    const foundGuest = guests?.find(
      guest => guest.nationalID === nationalIDToFind
    );
    const newGuest = { ...form.getValues() };

    setGuestValidation({ newGuest: newGuest, foundGuest: foundGuest });
    console.log(guestValidation);

    console.log(newGuest, foundGuest);

    if (!foundGuest && form.formState.isValid) {
      mutate(newGuest);
    }

    console.log(form.formState.errors);

    if (foundGuest) {
      if (newGuest.fullName !== foundGuest.fullName) {
        console.log(
          'The name is different from the previously registered guest with this National ID'
        );

        form.setError('fullName', {
          type: 'custom',
          message: `Name ${newGuest.fullName} is different than ${foundGuest.fullName}`,
        });
      }
      if (newGuest.email !== foundGuest.email) {
        console.log(
          'The email is different from the email registered with this National ID'
        );

        form.setError('email', {
          type: 'custom',
          message: `Email ${newGuest.email} is different than ${foundGuest.email}`,
        });
      }
      if (newGuest.nationalID !== foundGuest.nationalID) {
        console.log(
          'The nationality is different from the previously registered nationality with this National ID'
        );

        form.setError('nationalID', {
          type: 'custom',
          message: `NationalID ${newGuest.nationalID} is different than ${foundGuest.nationalID}`,
        });
      }
    }
  }

  function prevStep() {
    setStep('1');
  }

  function nextStep() {
    setStep('3');
    setFormState(formState => ({
      ...formState,
      steps: {
        ...formState.steps,
        customer: {
          ...formState.steps.customer,
          values: form.getValues(),
        },
      },
    }));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(nextStep)}>
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Smith"
                    {...field}
                    {...form.register('fullName', {
                      required: 'Full name is required',
                      validate: value =>
                        (guestValidation &&
                          guestValidation.foundGuest.fullName === value) ||
                        "Name is different than name from database",
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    {...form.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                      validate: value =>
                        (guestValidation &&
                          guestValidation.email === value) ||
                        'Email is different than email from database',
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        {...form.register('nationality', {
                          required: 'Nationality is required',
                          validate: value =>
                        (guestValidation &&
                          guestValidation.email === value) ||
                        'Nationality is different than nationality from database',
                        })}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? sortedCountries.find(
                              country => country === field.value
                            )
                          : 'Select nationality'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[250px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search nationality..."
                        className="h-9"
                      />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup className="max-h-[300px]">
                        <ScrollArea className="h-72 rounded-md">
                          {sortedCountries &&
                            sortedCountries.map(country => (
                              <CommandItem
                                value={country}
                                key={country}
                                onSelect={() => {
                                  form.setValue('nationality', country);
                                }}
                              >
                                {country}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    country === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </ScrollArea>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationalID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456789"
                    {...field}
                    {...form.register('nationalID', {
                      required: 'National ID is required',
                      pattern: {
                        value: /^\d{9,}$/,
                        message: 'Invalid National ID number',
                      },
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 mt-6">
          <ButtonShadcn variant="outline" onClick={prevStep}>
            Back
          </ButtonShadcn>
          <ButtonShadcn disabled={form.formState.isValid}>Next</ButtonShadcn>
          <ButtonShadcn onClick={isGuestInDatabase}>check guest</ButtonShadcn>
        </div>
      </form>
    </Form>
  );
}
