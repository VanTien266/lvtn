import { SessionActionTypes } from "../action-types/sessions";

const initialState = {
  loginIn: false,
  user: null,
  role: "GUEST",
  jwt: "",
};

export const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SessionActionTypes.SESSION_LOGIN:
      return {
        ...state,
        loginIn: true,
        user: payload,
        role: payload.role,
        jwt: payload.jwt,
      };
    case SessionActionTypes.SESSION_LOGOUT:
      return { ...state, role: "GUEST", user: null, jwt: "", loginIn: false };
    default:
      return state;
  }
};
