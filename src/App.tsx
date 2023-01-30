import { MantineProvider } from "@mantine/core";
import { useAppSelector } from "./store/hooks";
import AppHeader from "./Components/AppHeader";
import { selectColorScheme } from "./store/uiSlice";
import StartPage from "./Pages/StartPage";

function App() {
  const colorScheme = useAppSelector(selectColorScheme);
  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <AppHeader />
      <StartPage />
    </MantineProvider>
  );
}

export default App;
