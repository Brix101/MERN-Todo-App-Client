import axios from 'axios';
import { AuthContextProvider } from './context/AuthContext';
import Routers from './Routers';

axios.defaults.withCredentials = true;

const App = () => {

  return (
    <AuthContextProvider>
        <Routers/>
    </AuthContextProvider>
  )
}

export default App
