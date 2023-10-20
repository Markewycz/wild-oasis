import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import CabinRow, { CabinUpdate } from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

export interface Cabin {
  created_at?: string;
  description: string;
  discount: number;
  id?: number;
  image: string | File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export default function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    const fieldA = a[field as keyof Cabin];
    const fieldB = b[field as keyof Cabin];

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return (fieldA - fieldB) * modifier;
    } else {
      return 0;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin: CabinUpdate) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}
