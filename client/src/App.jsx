import ConfigRoutes from './routes/routes';
import { ThemeProvider } from './context/ThemeProvider';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ConfigRoutes />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
