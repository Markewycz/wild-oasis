import styled from 'styled-components';
import { Label } from '@radix-ui/react-label';
import { formatCurrency } from '../../utils/helpers';
import Table from '../../ui/Table';
import { Cabin as CabinType } from '../cabins/useCabins';
import { RadioGroupItem } from '@/components/ui/radio-group';

const Img = styled.img<{ src: string | File }>`
  display: block;
  width: 4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

type FreeCabinRowProps = {
  cabin: CabinType;
};

export default function FreeCabinRow({ cabin }: FreeCabinRowProps) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div className="flex items-center justify-end space-x-2">
        <Label
          htmlFor={name}
          className="px-1 py-1 shadow flex items-center border cursor-pointer rounded-md hover:bg-accent [&:has([data-state=checked])]:bg-primary"
        >
          <RadioGroupItem value={cabinId?.toString() as string} id={name} />
        </Label>
      </div>
    </Table.Row>
  );
}
