import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function SummaryCheckbox({ value }) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={value} disabled />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={value}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Include breakfast?
        </Label>
        <p className="text-sm text-muted-foreground">
          Additional $25 per person
        </p>
      </div>
    </div>
  );
}
