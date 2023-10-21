import { Cabin } from '../features/cabins/CabinTable';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
}

export async function createUpdateCabin(newCabin: Cabin, id?: number) {
  console.log(newCabin);

  const hasImagePath = typeof newCabin.image === 'string';

  const imageName =
    newCabin.image instanceof File &&
    `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // CREATE
  if (!id) supabase.from('cabins').insert([{ ...newCabin, image: imagePath }]);

  // EDIT
  if (id)
    supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);

  const { data, error } = await supabase.from('cabins').select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName as string, newCabin.image, {
      cacheControl: '3600',
      upsert: false,
    });

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', newCabin.id);
    console.error(storageError);

    throw new Error(
      'Cabin image count not be uploaded and the cabin was not created'
    );
  }

  return data;
}
