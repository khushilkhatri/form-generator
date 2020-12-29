/**
 * Store user in local storage
 * @param {any} user user data to store in local storage
 */
const storeUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Get user from local storage
 */
const getUser: any = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

/**
 * Remove current user local storage
 */
const removeUser: any = () => {
  localStorage.removeItem("user");
};

/**
 * Store workflow data in local storage
 * @param {any} data workflow data to store
 */
const storeData = (data: any) => {
  localStorage.setItem("data", JSON.stringify(data));
};

/**
 * Get workflow data from local storage
 */
const getData: any = () => {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export { storeUser, getUser, removeUser, storeData, getData };
