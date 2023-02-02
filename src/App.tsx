import { MantineProvider } from "@mantine/core";
import { useAppSelector } from "./store/hooks";
import AppHeader from "./Components/AppHeader";
import { selectColorScheme } from "./store/uiSlice";
import StartPage from "./Pages/StartPage";
import AppModal from "./Components/modals/AppModal";
import { Route, Routes } from "react-router-dom";
import DataGrid from "./Components/DataGrid/DataGrid";

function App() {
  const colorScheme = useAppSelector(selectColorScheme);
  return (
    <MantineProvider
      withCSSVariables
      theme={{ colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppModal />
      <AppHeader />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/d/:name" element={<DataGrid />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
