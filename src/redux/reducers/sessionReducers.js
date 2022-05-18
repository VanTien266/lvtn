import AsyncStorage from "@react-native-async-storage/async-storage";
import { SessionActionTypes } from "../action-types/sessions";

const initialState = {
  loginIn: false,
  user: null,
  role: "GUEST",
  access_token: null,
};

export const sessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SessionActionTypes.SESSION_LOGIN:
      // AsyncStorage.setItem("access_token", payload.access_token);
      return {
        ...state,
        loginIn: true,
        user: payload,
        role: payload.role ? payload.role : "USER",
        access_token: payload.access_token,
      };
    case SessionActionTypes.SESSION_LOGOUT:
      AsyncStorage.removeItem("access_token");
      return {
        ...state,
        role: "GUEST",
        user: null,
        access_token: "",
        loginIn: false,
      };
    default:
      return state;
  }
};
