import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import SpinnerMini from './SpinnerMini';

export default function BookingDialog({
  isPaidSet,
  submitForm,
  isCreatingBooking,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className={!isPaidSet ? 'cursor-not-allowed' : ''}>
        <DialogTrigger className={!isPaidSet ? 'pointer-events-none' : ''}>
          <Button disabled={!isPaidSet}>Create New Booking</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new booking</DialogTitle>
          <DialogDescription>
            Are you sure that all data is correct?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={submitForm}>
              {isCreatingBooking ? (
                <div className="flex gap-1">
                  <SpinnerMini /> Creating...
                </div>
              ) : (
                'Create New Booking'
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
