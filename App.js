import AppNavigation from './navigations/appNavigation';
import { useFonts, NovaSquare_400Regular } from '@expo-google-fonts/nova-square';
import { ContextProvider } from './context/context';


export default function App() {
  let [fontsLoaded, fontError] = useFonts({ NovaSquare_400Regular });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>
  );
}
