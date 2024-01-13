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

import { useSortedCountries } from './useSortedCountries';
import TypeAheadDropDown from './TypeAhead';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useState } from 'react';

export default function CustomerInformationForm({ setStep, setFormState }) {
  const { guests, isLoading: isLoadingGuests } = useGuests();
  const { mutate, isLoading: isCreatingGuests } = useCreateGuest();
  const { sortedCountries, isLoading: isLoadingCountries } =
    useSortedCountries();
  const form = useForm();

  /* <SelectCountries
              field={field}
              {...form.register('nationality', {
                required: 'Nationality is required',
              })}
            /> */

  function isGuestInDatabase() {
    const nationalIDToFind = form.getValues().nationalId;
    const foundGuest = guests?.find(
      guest => guest.nationalID === nationalIDToFind
    );
    const newGuest = { ...form.getValues() };

    console.log(newGuest);
    // if (!foundGuest) {
    // }
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

  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  const onTextChange = e => {
    const value = e.target.value;
    let newSuggestions = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      newSuggestions = sortedCountries.sort().filter(item => regex.test(item));
    }

    setSuggestions(newSuggestions);
    setText(value);
  };

  const suggestionSelected = value => {
    setText(value);
    setSuggestions([]);
  };

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
                <FormControl>
                  <Input
                    onChange={onTextChange}
                    placeholder="Search country"
                    value={text}
                    type="text"
                  />
                </FormControl>

                {suggestions.map(item => (
                  <div
                    key={item}
                    value={item}
                    onClick={() => suggestionSelected(item)}
                  >
                    {item}
                  </div>
                ))}

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456789"
                    {...field}
                    {...form.register('nationalId', {
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
