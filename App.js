import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ApplyScreen from './screens/ApplyScreen';
import BvnScreen from './screens/BvnScreen';
import HistoryScreen from './screens/HistoryScreen';

const App = createStackNavigator({
  HomeScreen: {screen: HomeScreen},
  ApplyScreen: {screen: ApplyScreen},
  BvnScreen: {screen: BvnScreen},
  HistoryScreen: {screen: HistoryScreen}
});

export default App;