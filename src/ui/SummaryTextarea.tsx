import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function SummaryTextarea({ label, value }) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={value}>{label}</Label>
      <Textarea value={value} id={value} disabled />
    </div>
  );
}
