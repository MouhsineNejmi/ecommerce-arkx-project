import ConfigRoutes from '@/routes/routes';
import { ThemeProvider } from '@/context/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ConfigRoutes />
    </ThemeProvider>
  );
};

export default App;
