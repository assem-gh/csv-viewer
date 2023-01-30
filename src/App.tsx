import { MantineProvider } from "@mantine/core";
import { useAppSelector } from "./store/hooks";
import AppHeader from "./Components/AppHeader";
import { selectColorScheme } from "./store/uiSlice";

function App() {
  const colorScheme = useAppSelector(selectColorScheme);
  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <AppHeader />
    </MantineProvider>
  );
}

export default App;
