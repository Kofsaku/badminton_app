// redux/reducers/userReducer.js
const initialState = {
  apiKey: null,
  isLoggedIn: false,
  fullName: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        apiKey: action.payload.apiKey,
        isLoggedIn: true,
        fullName: action.payload.full_name,
        role: action.payload.role
      };
    case 'LOGOUT_USER':
      return {
        apiKey: null,
        isLoggedIn: false,
        fullName: null,
        role: null,
      };
    default:
      return state;
  }
};

export default userReducer;
