import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image } from "react-native";
import Login from "../screens/authentication/login";
import Courses from "../screens/courses";
import PreStart from "../screens/preStart";
import Start from "../screens/Start";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Cart from "../screens/cart";
import Favorites from "../screens/favorites";
import EditProfile from "../screens/editProfile";
import Settings from "../screens/settings";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DrowerItem from "../components/drawerItem";
import SignUp from "../screens/authentication/signUp";
import Forgetpass from "../screens/authentication/forgetPass";
import CourseDetails from "../screens/courseDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Navigation: FC = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="PreStart" component={PreStart} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Forgetpass" component={Forgetpass} />
      <Stack.Screen name="Courses" component={MyDrawer} />
    </Stack.Navigator>
  );
};

export default Navigation;

const MyTab: FC = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      initialRouteName="CoursesTab"
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarStyle: {
          backgroundColor: "#4F91FF",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart-o" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-basket" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CoursesTab"
        component={Courses}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="Profile"
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
        name="drawer"
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
  return (
    <Drawer.Navigator
      drawerContent={() => <DrowerItem />}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerStyle: {
          borderBottomLeftRadius: 35,
          borderTopLeftRadius: 35,
          width: "56%",
        },
      }}
    >
      <Drawer.Screen name="drawerTab" component={MyTab} />
    </Drawer.Navigator>
  );
};
