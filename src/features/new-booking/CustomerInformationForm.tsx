import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useGuests } from './useGuests';
import { useCreateGuest } from './useCreateGuest';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  CaretSortIcon,
  CheckIcon,
  ChevronRightIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
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
  const { guests, isLoadingGuests } = useGuests();
  const { mutateAsync, isCreatingGuests, isSuccess } = useCreateGuest();
  const { sortedCountries } = useSortedCountries();

  const [isFoundGuest, setIsFoundGuest] = useState<boolean | undefined>(
    undefined
  );
  const [foundGuest, setFoundGuest] = useState(undefined);

  const form = useForm({
    defaultValues: {
      nationalID: '',
      fullName: '',
      email: '',
      nationality: '',
    },
  });

  const createUser = async () => {
    if (!foundGuest && form.formState.isValid) {
      const newGuest = { ...form.getValues() };
      await mutateAsync(newGuest);
    }
  };

  const handleCheck = async () => {
    const _ = form.formState.errors;
    await form.trigger();
    await createUser().then(() => console.log(guests));

    setFormState(formState => ({
      ...formState,
      customer: {
        ...form.getValues(),
      },
    }));
    nextStep();
  };

  const isGuestInDatabase = async e => {
    e.preventDefault();
    await form.trigger('nationalID');

    const invalidNationalID = form.getFieldState('nationalID').invalid;

    if (!invalidNationalID) {
      const nationalIDToFind = form.getValues().nationalID;
      const foundGuest = await guests?.find(
        guest => guest.nationalID === nationalIDToFind
      );

      if (foundGuest) setGuestCredentials(foundGuest);
      if (!foundGuest) resetGuestCredentials();

      setIsFoundGuest(!!foundGuest);
      setFoundGuest(foundGuest);
    }
  };

  const setGuestCredentials = foundGuest => {
    const { fullName, email, nationality } = foundGuest;
    form.setValue('fullName', fullName);
    form.setValue('email', email);
    form.setValue('nationality', nationality);
  };

  const resetGuestCredentials = () => {
    form.resetField('fullName');
    form.resetField('email');
    form.resetField('nationality');
  };

  const onChangeNationalID = async (e, onChange) => {
    onChange(e.target.value);
    await form.trigger('nationalID');

    const invalidNationalID = form.getFieldState('nationalID').invalid;

    if (invalidNationalID) setIsFoundGuest(undefined);
    if (!invalidNationalID) resetGuestCredentials();
  };

  const prevStep = () => setStep('1');

  // const saveFormState = () => {
  //   setFormState(formState => ({
  //     ...formState,
  //     customer: {
  //       ...form.getValues(),
  //     },
  //   }));
  // };

  const nextStep = () => {
    setStep('3');
  };

  // const handleForm = () => {
  //   setFormState(formState => ({
  //     ...formState,
  //     customer: {
  //       ...form.getValues(),
  //     },
  //   }));
  //   setStep('3');
  // };

  // const handleForm = () => {
  //   saveFormState();
  //   nextStep();
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCheck)}>
        <div className="space-y-6">
          <div className="flex">
            <FormField
              control={form.control}
              name="nationalID"
              disabled={isCreatingGuests}
              rules={{
                required: 'National ID is required',
                pattern: {
                  value: /^\d{9,}$/,
                  message: 'National ID must be exactly 9 digits',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="123456789"
                        onChange={e => onChangeNationalID(e, field.onChange)}
                      />
                      <div>
                        <Button
                          size="icon"
                          onClick={isGuestInDatabase}
                          disabled={isLoadingGuests || isCreatingGuests}
                          className="bg-primary hover:bg-primary-hover"
                        >
                          {!isLoadingGuests ? (
                            <ChevronRightIcon className="h-4 w-4" />
                          ) : (
                            <ReloadIcon className="h-4 w-4 animate-spin" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isFoundGuest !== undefined && (
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                disabled={isCreatingGuests}
                rules={{
                  required: 'Full name is required',
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                disabled={isCreatingGuests}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                disabled={isCreatingGuests}
                rules={{
                  required: 'Nationality is required',
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
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
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            disabled={isCreatingGuests}
            variant="outline"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button disabled={isCreatingGuests} type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
