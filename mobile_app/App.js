import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Login from './components/Login';
import Register from './components/Register';
import Dash from './components/Dash';
import Confirm from './components/Confirm';
import OrderList from './components/OrderList';
import PRList from './components/PRList';
import PR from './components/PR';
import SupplierList from './components/SupplierList';
import Welcome from './components/Welcome';
import ItemList from './components/ItemList';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...'], (isAffected, bundle) => {
  return isAffected || bundle.includes('example.js');
});

const App = createStackNavigator({
    Welcome                     : { screen: Welcome },
    ItemList                    : { screen: ItemList },
    Dash                        : { screen: Dash },
    Confirm                     : { screen: Confirm },
    PR                          : { screen: PR },
    PRList                      : { screen: PRList },
    OrderList                   : { screen: OrderList },
    SupplierList                : { screen: SupplierList },
    Login                       : { screen: Login }, 
    Register                    : { screen: Register },
  },
  {
    initialRouteName: 'Welcome',
  }
);
export default createAppContainer(App);