import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Divider from '@/ui/Divider';
import SummaryCheckbox from '@/ui/SummaryCheckbox';
import SummaryInput from '@/ui/SummaryInput';
import SummaryTextarea from '@/ui/SummaryTextarea';
import FreeCabinTable from './FreeCabinTable';
import SummaryCabin from '@/ui/SummaryCabinTable';
import { format } from 'date-fns';

export default function Summary({ formState }) {
  const {
    general: {
      dateRange: { from, to },
      numGuests,
      cabin,
      observations,
      hasBreakfast,
    },
    customer: { nationalID, fullName, nationality },
  } = formState;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Divider label="Trip details" />
        <div className="grid grid-cols-3 gap-2">
          <SummaryInput label="Check in" value={format(from, 'dd.MM.yyyy')} />
          <SummaryInput label="Check out" value={format(to, 'dd.MM.yyyy')} />
          <SummaryInput label="Number of guests" value={numGuests} />
        </div>
      </div>

      <SummaryCabin cabin={cabin} />

      <div className="flex flex-col gap-2">
        <SummaryTextarea label="Observations" value={observations} />
        <SummaryCheckbox value={hasBreakfast} />
      </div>

      <div>
        <Divider label="Guest details" />
        <div className="grid grid-cols-3 gap-2">
          <SummaryInput label="National ID" value={nationalID} />
          <SummaryInput label="Full name" value={fullName} />
          <SummaryInput label="Nationality" value={nationality} />
        </div>
      </div>
    </div>
  );
}
