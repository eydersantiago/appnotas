import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStateChanged } from "../store/auth/thunks";

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStateChanged());
  }, []);

  return {
    status,
  };
};
