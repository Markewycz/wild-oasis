import { Button } from '@/components/ui/button';

export default function FoundGuest() {
  return (
    <div className="flex gap-2 flex-col">
      <div>
        <p>Guest has been found in the database.</p>
        <p>Do you want to load his credentials?</p>
      </div>
      <div>
        <Button>Load guest</Button>
      </div>
    </div>
  );
}
