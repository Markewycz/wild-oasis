const countriesApiUrl = import.meta.env.VITE_COUNTRIES_URL;

export async function getAllCountries() {
  const data = await fetch(countriesApiUrl)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw new Error('Countries could not be loaded');
    });

  return data;
}

export async function getAllSortedCountries() {
  const data = await fetch(countriesApiUrl)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw new Error('Countries could not be loaded');
    });

  const sortedData = await data
    .map(country => {
      return country.name.common;
    })
    .sort((a, b) => a.localeCompare(b));

  return sortedData;
}
