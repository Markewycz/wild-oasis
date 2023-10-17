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
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/edit cabin
  let query = supabase.from('cabins');

  // CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image, {
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
