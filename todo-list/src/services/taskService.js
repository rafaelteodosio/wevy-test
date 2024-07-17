import axios from "axios";

const axiosCall = async (verb, values = {}, path = '') => {
  const token = localStorage.getItem('token');
  let response = {};
  if (verb === 'get' || verb === 'delete') {
    response = await axios[verb](`
      http://localhost:3001/tasks${path}`,
      { headers: { Authorization: token }, }
    );
  } else {
    response = await axios[verb](`
      http://localhost:3001/tasks${path}`,
      values,
      { headers: { Authorization: token }, }
    );
  }
  return response.data;
}

export const getTasks = async () => {
  return await axiosCall('get');
};

export const createTask = async (task) => {
  return axiosCall('post', { title: task }, '');
};

export const deleteTask = async (id) => {
  return axiosCall('delete', {}, `/${id}`);
};

export const updateTask = async (task) => {
  const { id, title } = task
  return axiosCall('put', { title }, `/${id}`);
};
