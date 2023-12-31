import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "nativewind";

//----------screens----------

import Login from "../screens/Authentication/Login";
import Courses from "../screens/Courses";
import Start from "../screens/Start";
import SplashScreen from "../screens/SplashScreen";
import Cart from "../screens/Cart";
import Favorites from "../screens/Favorites";
import EditProfile from "../screens/EditProfile";
import Settings from "../screens/Settings";
import SignUp from "../screens/Authentication/SignUp";
import Forgetpass from "../screens/Authentication/ForgetPass";
import CourseDetails from "../screens/CourseDetails";

//-----------------------------------

import { useColorTheme } from "../core/config/color";
import { ERouteList } from "../core/enums/route";
import { DrowerItem } from "../components/drawerItems";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const Navigation: FC = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={ERouteList.SplashScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ERouteList.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={ERouteList.Start} component={Start} />
      <Stack.Screen name={ERouteList.LogIn} component={Login} />
      <Stack.Screen name={ERouteList.SignUp} component={SignUp} />
      <Stack.Screen name={ERouteList.ForgetPass} component={Forgetpass} />
      <Stack.Screen name={ERouteList.MyDrawer} component={MyDrawer} />
    </Stack.Navigator>
  );
};

const MyTab: FC = ({ navigation }: any) => {
  const color = useColorTheme();

  return (
    <Tab.Navigator
      initialRouteName={ERouteList.CourseTab}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarStyle: {
          backgroundColor: color?.TabColor,
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name={ERouteList.Favorites}
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart-o" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ERouteList.Cart}
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark-o" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ERouteList.CourseTab}
        component={Courses}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
            name="document-text-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ERouteList.CourseDetails}
        component={CourseDetails}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name={ERouteList.Settings}
        component={Settings}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
      <Tab.Screen
        name={ERouteList.EditProfile}
        component={EditProfile}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        }}
        name={ERouteList.Drawer}
        component={MyDrawer}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="navicon" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyDrawer: FC = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Drawer.Navigator
      drawerContent={() => <DrowerItem />}
      screenOptions={{
        sceneContainerStyle: {
          backgroundColor: colorScheme === "dark" ? "#00216C" : "#f2f2f2",
        },
        drawerPosition: "right",
        headerShown: false,
        drawerStyle: {
          borderBottomLeftRadius: 35,
          borderTopLeftRadius: 35,
          width: "56%",
        },
      }}
    >
      <Drawer.Screen name={ERouteList.DrawerTab} component={MyTab} />
    </Drawer.Navigator>
  );
};
