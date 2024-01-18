import SummaryCabinRow from './SummaryCabinRow';
import Table from './Table';

export default function SummaryCabin({ cabin }) {
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

      <div className="my-[0.25rem] mx-0">
        <SummaryCabinRow cabin={cabin} />
      </div>
    </Table>
  );
}
