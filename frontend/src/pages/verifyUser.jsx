
import Home from './Home'
import HomeAuth from './homeAuth'
import { useAuthStore } from '../store/userAuth'


const VerifyUser = () => {
    const { user } = useAuthStore();

    return (
        <div>
            {user ? <HomeAuth /> : <Home />}
        </div>
    )
}

export default VerifyUser
