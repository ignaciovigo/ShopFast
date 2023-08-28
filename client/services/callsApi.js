import CONSTANTS from "../src/constants/constants.js";

export async function searchProducts({ search, newURL = null }) {
  const URL = newURL || CONSTANTS.PRODUCTS_URL;
  const LatestUrl = (!newURL && search) ? URL + `?query=${search}` : URL
  try {
    const data = await fetch(LatestUrl, {
      method: "GET",
      credentials: "include",
    });
    const result = await data.json();
    if (result.status !== "success") throw result;
    return result;
  } catch (error) {
    throw {...error}
  }
}

export async function getAllUsers({search, newURL = null}){
  try {
    const URL = newURL || CONSTANTS.ALL_USERS_URL
    const latestUrl = (!newURL && search) ? URL + `?query=${search}` : URL
    const users = await fetch (latestUrl, {
      method: 'GET',
      credentials: 'include'
    })
    const result = await users.json()
    if(result.status !== 'success') throw result
    return result.payload
  } catch (error) {
    throw {...error}
  }
}

export async function removeUserById({ id }){
  try {
    const resp = await fetch(CONSTANTS.ALL_USERS_URL + `/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const result = await resp.json()
    if(result.status !== 'success') throw result
    return result
  } catch (error) {
    throw {...error}
  }
}

export async function updateUserRole({ email, update }) {
  try {
    const resp = await fetch(CONSTANTS.ALL_USERS_URL+'/role', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email ,update})
    })
    const result = await resp.json()
    if(result.status !== 'success') throw result
    return result
  } catch (error) {
    throw {...error}
  }
}