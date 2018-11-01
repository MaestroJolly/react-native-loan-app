import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ApplyScreen from './screens/ApplyScreen';
import BvnScreen from './screens/BvnScreen';
import HistoryScreen from './screens/HistoryScreen';
import ChargeScreen from './screens/ChargeScreen';
import AccountScreen from './screens/AccountScreen';

const App = createDrawerNavigator({
  HomeScreen: {screen: HomeScreen},
  ApplyScreen: {screen: ApplyScreen},
  BvnScreen: {screen: BvnScreen},
  HistoryScreen: {screen: HistoryScreen},
  ChargeScreen: {screen: ChargeScreen},
  AccountScreen: {screen: AccountScreen}
});

export default App;