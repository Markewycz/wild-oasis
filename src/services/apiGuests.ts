import supabase from './supabase';

export async function getGuests() {
  const { data, error } = await supabase.from('guests').select('*');

  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded');
  }

  return data;
}

export async function createGuest(guest) {
  const { data, error } = await supabase
    .from('guests')
    .insert([guest])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Guests could not be created');
  }

  return data;
}
