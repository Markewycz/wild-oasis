import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSortedCountries } from '@/features/new-booking/useSortedCountries';
import { FixedSizeList as List } from 'react-window';
import { memo, useState } from 'react';

const Row = memo(({ index, style, data }) => {
  return (
    <SelectItem key={data[index]} value={data[index]} style={style}>
      {data[index]}
    </SelectItem>
  );
});

export default function SelectCountries({ field }) {
  const { sortedCountries, isLoading } = useSortedCountries();
  const [value, setValue] = useState<string>();

  return (
    <Select
      value={field.value}
      onValueChange={val => {
        field.onChange(val);
        setValue(val);
      }}
    >
      <SelectTrigger
        className={`w-[240px] dark:shadow-old-md ${
          isLoading && 'animate-pulse'
        }`}
      >
        <SelectValue
          placeholder={isLoading ? 'Loading...' : 'Select a nationality'}
        >
          {value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortedCountries && (
          <SelectGroup>
            <List
              width={280}
              height={300}
              itemSize={35}
              itemCount={sortedCountries.length}
              itemData={sortedCountries}
            >
              {Row}
            </List>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
    // sortedCountries && (
    //   <AutoSizer>
    //     {({ height, width }) => (
    //       <List
    //         width={width}
    //         height={height}
    //         itemSize={50}
    //         itemCount={sortedCountries.length}
    //         itemData={sortedCountries}
    //       >
    //         {Row}
    //       </List>
    //     )}
    //   </AutoSizer>
    // )
  );
}
