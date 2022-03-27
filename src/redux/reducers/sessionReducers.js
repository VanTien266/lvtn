import AsyncStorage from "@react-native-async-storage/async-storage";
import { SessionActionTypes } from "../action-types/sessions";

const initialState = {
  loginIn: false,
  user: null,
  role: "GUEST",
  jwt: null,
};

export const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SessionActionTypes.SESSION_LOGIN:
      AsyncStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        loginIn: true,
        user: payload,
        role: payload.role ? payload.role : "USER",
        jwt: payload.jwt,
      };
    case SessionActionTypes.SESSION_LOGOUT:
      AsyncStorage.removeItem("user");
      return { ...state, role: "GUEST", user: null, jwt: "", loginIn: false };
    default:
      return state;
  }
};
