import AppNavigation from './navigations/appNavigation';
import { useFonts, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { ContextProvider } from './context/context';


export default function App() {
  let [fontsLoaded, fontError] = useFonts({ Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>

  );
}
