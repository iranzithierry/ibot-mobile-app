import AppNavigation from './navigations/appNavigation';
import { useFonts, Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { ContextProvider } from './context/context';


export default function App() {
  let [fontsLoaded, fontError] = useFonts({ Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>

  );
}
