import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentToken, setPersist } from '../redux/slices/authSlice';
import { useLazyLogoutQuery } from '../redux/slices/authApiSlice';
import { useNavigate } from "react-router-dom"

export function useLogout() {
  const token = useSelector(selectCurrentToken)

  const [triggerLogout] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await triggerLogout();
      dispatch(logOut());
      dispatch(setPersist(false))
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
}
