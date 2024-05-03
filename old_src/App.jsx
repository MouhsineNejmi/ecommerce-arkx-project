import ConfigRoutes from "./routes/routes";
import { ThemeProvider } from "./context/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <ConfigRoutes />
    </ThemeProvider>
  );
};

export default App;
