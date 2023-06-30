import { INITIAL_STATE } from "./type";
import { toast } from "react-toastify";

export const initiate = () => {
  return async (dispatch: any) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        dispatch({
          type: INITIAL_STATE,
          payload: {
            isAuthenticated: true,
            finishInitiate: true,
          },
        });
      } else {
        dispatch({
          type: INITIAL_STATE,
          payload: {
            isAuthenticated: false,
            finishInitiate: true,
          },
        });
      }
    } catch (error) {
      toast(error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("accessToken");

      dispatch({
        type: INITIAL_STATE,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    } catch (error) {
      toast(error.message);
    }
  };
};
