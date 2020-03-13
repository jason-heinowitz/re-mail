import * as types from '../constants/flashTypes';

const initialState = {
  messages: [],
};

const flashReducer = (state = initialState, action) => {
  let messages;

  switch (action.type) {
    case types.FLASH_SUCCESS:
      // console.log(action.message, action.group);
      messages = [...state.messages];
      messages.push({
        message: action.message,
        group: action.group,
      });

      return {
        ...state,
        messages,
      };

    case types.FLASH_REMOVE:
      messages = [...state.messages];
      messages.splice(action.index, 1);

      return {
        ...state,
        messages,
      };

    case types.FLASH_REMOVE_ALL:
      return {
        ...state,
        messages: [],
      };

    default:
      return state;
  }
};

export default flashReducer;
