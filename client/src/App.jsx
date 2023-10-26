import { useDarkMode } from './hooks/useDarkMode';
import ConfigRoutes from './routes/routes';

const App = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${darkMode && 'dark'}`}>
      <ConfigRoutes />
    </div>
  );
};

export default App;
