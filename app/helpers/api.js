
import * as SecureStore from 'expo-secure-store';

const URL = "http://localhost:8000/api";

async function getData(urlEndpoint) {
  const data = await fetchData(urlEndpoint);
  return data;
}

async function getToken(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      alert('No values stored under that key.');
    }
  } catch (error) {
    console.log(error);
  }
}

const fetchDataDetails = async (results) => {
  try {
    const token = await getToken("token");
    const responses = await results.map(res => {
      return fetch(res.api_url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Token ${token}`
        }
      });
    });

    const jsonProms = await Promise.all(responses);
    const data = await Promise.all(jsonProms.map(r => r.json()));
    return data;

  } catch (error) {
    console.error(error);
  }
};

const fetchData = async (urlEndpoint) => {
  try {
    const token = await getToken("token");
    if (!token) {
      console.error("No token available");
      return;
    }
    const response = await fetch(`${URL}/${urlEndpoint}/`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Token ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return fetchDataDetails(data.results);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export { getData };