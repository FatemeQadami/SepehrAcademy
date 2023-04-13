import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useColorScheme } from "nativewind";

//----------screens----------

import Login from "../screens/authentication/login";
import Courses from "../screens/courses";
import Start from "../screens/start";
import SplashScreen from "../screens/splashScreen";
import Cart from "../screens/cart";
import Favorites from "../screens/favorites";
import EditProfile from "../screens/editProfile";
import Settings from "../screens/settings";
import SignUp from "../screens/authentication/signUp";
import Forgetpass from "../screens/authentication/forgetPass";
import CourseDetails from "../screens/courseDetails";

//-----------------------------------

import { useColorTheme } from "../core/config/color";
import { ERouteList } from "../core/enums/route";
import { DrowerItem } from "../components/drawerItem";

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
      <Stack.Screen name={ERouteList.Courses} component={MyDrawer} />
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
          backgroundColor: color?.tabColor,
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
            <FontAwesome name="shopping-basket" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ERouteList.CourseTab}
        component={Courses}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={25} color={color} />
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
