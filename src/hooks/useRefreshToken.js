import { useDispatch, useSelector } from 'react-redux';
import { useLazyRefreshQuery } from "../redux/slices/authApiSlice"
import { selectCurrentUser } from "../redux/slices/authSlice"
import { setAuth } from '../redux/slices/authSlice'

export function useRefreshToken() {
    const [triggerRefresh] = useLazyRefreshQuery();
    const dispatch = useDispatch();
    const currentEmail = useSelector(selectCurrentUser)

    const refresh = async () => {
        try {
            const response = await triggerRefresh();
            
            dispatch(setAuth({
                email: currentEmail,
                roles: response?.data?.roles,
                accessToken: response?.data?.accessToken
            }))
            
            return response.data.accessToken
        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
}
