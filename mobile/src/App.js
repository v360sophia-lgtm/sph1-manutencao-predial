import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from './store/authStore';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ServiceCallsScreen from './screens/technician/ServiceCallsScreen';
import ServiceCallDetailScreen from './screens/technician/ServiceCallDetailScreen';
import CompleteCallScreen from './screens/technician/CompleteCallScreen';
import ProfileScreen from './screens/technician/ProfileScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function TechnicianStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ServiceCallsList"
        component={ServiceCallsScreen}
        options={{ title: 'Meus Chamados' }}
      />
      <Stack.Screen
        name="ServiceCallDetail"
        component={ServiceCallDetailScreen}
        options={{ title: 'Detalhes do Chamado' }}
      />
      <Stack.Screen
        name="CompleteCall"
        component={CompleteCallScreen}
        options={{ title: 'Finalizar Chamado' }}
      />
    </Stack.Navigator>
  );
}

function TechnicianTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Chamados') {
            iconName = focused ? 'construction' : 'construction';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen
        name="Chamados"
        component={TechnicianStack}
        options={{ title: 'Chamados' }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { token, loadToken } = useAuthStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    loadToken().then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {token ? <TechnicianTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
