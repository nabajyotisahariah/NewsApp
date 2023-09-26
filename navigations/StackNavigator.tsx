import React from 'react';
//import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../assets/constants';
import {NavigationContainer} from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import Categories from '../screens/CategoryScreen';
import Settings from '../screens/SettingsScreen';
import NewsDetail from '../screens/NewsDetailScreen';
import HomePostsDisplay from '../components/HomePageItemsLoader';
import HomeSlider from '../components/HomeSlider';
import CategoryView from '../screens/CategoryDetailScreen';
import ReviewDetail from '../screens/ReviewDetailScreen';

// Stacks
const HomeStack = createNativeStackNavigator();
const CategoriesStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

// Home Screen Stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeTab">
      <HomeStack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_BG},
        }}
      />

      {/* <HomeStack.Screen
        name="StackNewsDetail"
        component={NewsDetail}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_BG},
        }}
      /> */}

      <HomeStack.Screen
        name="HomePostsDisplay"
        component={HomePostsDisplay}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_BG},
        }}
      />

      <HomeStack.Screen
        name="HomeSlider"
        component={HomeSlider}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_BG},
        }}
      />

      {/* <HomeStack.Screen
        name="StackReviewDetail"
        component={ReviewDetail}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_BG},
        }}
      /> */}
    </HomeStack.Navigator>
  );
}

// Categories Stack Screen
function CategoriesStackScreen() {
  return (
    <CategoriesStack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: constants.LIGHT_THEME_BG,
          elevation: 0,
        },
      }}>
      <CategoriesStack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_LIGHT_BLUE_BG},
        }}
      />

      <CategoriesStack.Screen
        name="CategoryView"
        component={CategoryView}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_LIGHT_BLUE_BG},
        }}
      />
    </CategoriesStack.Navigator>
  );
}

// Settings Stack Screen

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: constants.LIGHT_THEME_BG},
        }}
      />
    </SettingsStack.Navigator>
  );
}

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          elevation: 50,
          backgroundColor: constants.LIGHT_THEME_BG,
        },
      }}>
      <Tab.Screen
        name="CategoriePage"
        component={CategoriesStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color = focused
              ? constants.LIGHT_THEME_PRIMARY_COLOR
              : constants.LIGHT_THEME_TEXT_COLOR;
            let icon = focused ? 'hand-left' : 'hand-left-outline';
            let size = focused ? 30 : 24;
            return <Icon name={icon} size={size} color={color} />;
          },
          tabBarLabel: 'Categories',
          tabBarActiveTintColor: constants.LIGHT_THEME_PRIMARY_COLOR,
          tabBarInactiveTintColor: constants.LIGHT_THEME_TEXT_COLOR,
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color = focused
              ? constants.LIGHT_THEME_PRIMARY_COLOR
              : constants.LIGHT_THEME_TEXT_COLOR;
            let icon = focused ? 'home' : 'home-outline';
            let size = focused ? 30 : 24;
            return <Icon name={icon} size={size} color={color} />;
          },
          tabBarLabel: 'Home',
          tabBarActiveTintColor: constants.LIGHT_THEME_PRIMARY_COLOR,
          tabBarInactiveTintColor: constants.LIGHT_THEME_TEXT_COLOR,
        }}
      />

      <Tab.Screen
        name="SettingsPage"
        component={SettingsStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let color = focused
              ? constants.LIGHT_THEME_PRIMARY_COLOR
              : constants.LIGHT_THEME_TEXT_COLOR;
            let icon = focused ? 'settings' : 'settings-outline';
            let size = focused ? 30 : 24;
            return <Icon name={icon} size={size} color={color} />;
          },
          tabBarLabel: 'Settings',
          tabBarActiveTintColor: constants.LIGHT_THEME_PRIMARY_COLOR,
          tabBarInactiveTintColor: constants.LIGHT_THEME_TEXT_COLOR,
        }}
      />
    </Tab.Navigator>
  );
};

// Navigator Export
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}>
        <Stack.Screen
          name="StackNewsDetail"
          options={{headerShown: false}}
          component={NewsDetail}
        />
        <Stack.Screen
          name="StackReviewDetail"
          options={{headerShown: false}}
          component={ReviewDetail}
        />
        <Stack.Screen
          name="Tabs"
          options={{headerShown: false}}
          component={MyTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
