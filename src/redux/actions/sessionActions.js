import { SessionActionTypes } from "../action-types/sessions";

export const login = (user) => {
  return { type: SessionActionTypes.SESSION_LOGIN, payload: user };
};
export const logout = () => {
  return { type: SessionActionTypes.SESSION_LOGOUT };
};
