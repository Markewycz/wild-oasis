import Table from '@/ui/Table';
import { RadioGroup } from '@radix-ui/react-radio-group';
import FreeCabinRow from './FreeCabinRow';
import { Cabin } from '../cabins/useCabins';

type FreeCabinTableProps = {
  setSelectedCabin: (e: string) => void;
  freeCabins: Cabin[];
};

export default function FreeCabinTable({
  setSelectedCabin,
  freeCabins,
}: FreeCabinTableProps) {
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <RadioGroup onValueChange={value => setSelectedCabin(value)}>
        <Table.Body
          data={freeCabins}
          render={(cabin: Cabin) => (
            <FreeCabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </RadioGroup>
    </Table>
  );
}
