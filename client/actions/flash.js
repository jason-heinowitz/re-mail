import * as types from '../constants/flashTypes';

export const flashSuccess = ({ message, group }) => ({
  type: types.FLASH_SUCCESS,
  message,
  group,
});

export const flashRemove = (index) => ({
  type: types.FLASH_REMOVE,
  index,
});

export const flashRemoveAll = () => ({
  type: types.FLASH_REMOVE_ALL,
});
