import { Outlet } from 'react-router-dom';

const SimpleLayout = ({ children }) => {
    return (
        <main>
            <Outlet />
        </main>
    );
  };
  
  export default SimpleLayout;
  