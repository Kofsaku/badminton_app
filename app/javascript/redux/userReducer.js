// redux/reducers/userReducer.js
const initialState = {
  apiKey: null,
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        apiKey: action.payload.apiKey,
        isLoggedIn: true,
      };
    case 'LOGOUT_USER':
      return {
        apiKey: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
