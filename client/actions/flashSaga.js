import * as types from '../constants/flashTypesSaga';

export const create = ({ message, group }) => ({
  type: types.CREATE_MESSAGE,
  message,
  group,
});

export const remove = (index) => ({
  type: types.DELETE_MESSAGE,
  index,
});

export const clear = () => ({
  type: types.DELETE_ALL,
});
