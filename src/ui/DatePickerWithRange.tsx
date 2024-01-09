'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, differenceInDays, format, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';

export function DatePickerWithRange({ field, setSearchArgs }) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(),
  //   to: addDays(new Date(), 7),
  // });
  const disabledDays = [{ from: new Date(1999, 1, 1), to: new Date() }];

  // function setRangeDate(date) {
  //   setDate(date);
  //   rangeDays();
  // }

  function calcRangeDays(value) {
    const dateArray = [];

    if (value?.from && value?.to) {
      const numDays = Math.abs(differenceInDays(value.from, value.to));

      for (let i = 0; i < numDays + 1; i++) {
        dateArray.push(format(addDays(new Date(value.from), i), 'yyyy.MM.dd'));
      }
    }
    return dateArray;
  }

  // React.useEffect(() => {
  //   rangeDays();
  // }, [date]);

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value?.from ? (
                field.value.to ? (
                  <>
                    {format(field.value.from, 'LLL dd, y')} -{' '}
                    {format(field.value.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(field.value.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            min={3}
            max={90}
            selected={field.value}
            onSelect={value => {
              field.onChange(value);
              if (value.from && value.to) {
                const rangeDays = calcRangeDays(value);
                setSearchArgs(prev => ({
                  ...prev,
                  rangeDate: { value, rangeDays },
                }));
              }
            }}
            numberOfMonths={2}
            disabled={disabledDays}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
