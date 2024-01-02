import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectNumGuests({ setNumGuests }) {
  return (
    <Select required onValueChange={value => setNumGuests(value)}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a number of guests" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="4">4</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="6">6</SelectItem>
          <SelectItem value="7">7</SelectItem>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="9">9</SelectItem>
          <SelectItem value="10">10</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
