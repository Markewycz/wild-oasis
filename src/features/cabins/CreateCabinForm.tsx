import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';
import { useSettings } from '../settings/useSettings';
import { Cabin } from './CabinTable';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

type CabinForm = {
  description: string;
  discount: number;
  image: FileList;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

type CreateCabinFormProps = {
  cabinToUpdate?: Cabin;
  onCloseModal?: () => void;
};

function CreateCabinForm({
  cabinToUpdate,
  onCloseModal,
}: CreateCabinFormProps) {
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { settings: { maxGuestsPerBooking } = {} } = useSettings();

  const { id: updateId, ...updateValues } =
    typeof cabinToUpdate !== 'undefined' ? cabinToUpdate : { id: undefined };
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinForm>({
      defaultValues: isUpdateSession ? updateValues : {},
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<CabinForm> = data => {
    const image: string | File =
      typeof data.image === 'string' ? data.image : data.image[0];

    if (isUpdateSession && updateId) {
      updateCabin(
        { newCabinData: { ...data, image }, id: updateId },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  function onError(errors: FieldErrors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
            max: {
              value: maxGuestsPerBooking,
              message: `Maximum guests per booking is ${maxGuestsPerBooking}`,
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: value =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isUpdateSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isUpdateSession ? 'Update cabin' : 'Create new cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
