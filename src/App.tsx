import { MantineProvider } from "@mantine/core";
import { useAppSelector } from "./store/hooks";
import AppHeader from "./Components/AppHeader";
import { selectColorScheme } from "./store/uiSlice";
import StartPage from "./Pages/StartPage";
import AppModal from "./Components/Modals/AppModal";
import { Route, Routes } from "react-router-dom";
import DataGridPage from "./Pages/DataGridPage";
import AppDrawer from "./Components/Drawers/AppDrawer";

function App() {
  const colorScheme = useAppSelector(selectColorScheme);
  return (
    <MantineProvider
      withCSSVariables
      theme={{ colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppDrawer />
      <AppModal />
      <AppHeader />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/d/:name" element={<DataGridPage />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
