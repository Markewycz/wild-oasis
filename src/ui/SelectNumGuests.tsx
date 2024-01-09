import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectNumGuests({ field, setSearchArgs }) {
  return (
    <Select
      onValueChange={value => {
        field.onChange(value);
        setSearchArgs(prev => ({ ...prev, numGuests: value }));
      }}
      value={field.value}
    >
      <SelectTrigger
        className={`w-[240px] ${!field.value && 'text-muted-foreground'}`}
      >
        <SelectValue placeholder="Select a number of guests" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: 10 }).map((_, index) => (
            <SelectItem key={index} value={`${index + 1}`}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
