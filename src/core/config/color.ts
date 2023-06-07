import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

const blueTheme = {
  HeaderColor: "#4F91FF",
  TabColor: "#4F91FF",
  RouteBorderColor: "#4F91FF",
  RouteTextColor: "#4F91FF",
  FilterColor: "#4F91FF",
  IconColor: "#4F91FF",
  ActivityIndicatorColor: "#4F91FF",
};

const greenTheme = {
  HeaderColor: "#00C06D",
  TabColor: "#00C06D",
  RouteBorderColor: "#00C06D",
  RouteTextColor: "#00C06D",
  FilterColor: "#00C06D",
  IconColor: "#00C06D",
  ActivityIndicatorColor: "#00C06D",
};

const redTheme = {
  HeaderColor: "#FF3E3E",
  TabColor: "#FF3E3E",
  RouteBorderColor: "#FF3E3E",
  RouteTextColor: "#FF3E3E",
  FilterColor: "#FF3E3E",
  IconColor: "#FF3E3E",
  ActivityIndicatorColor: "#FF3E3E",
};

export const useColorTheme = () => {
  const { theme } = useSelector((state: RootState) => state.theme);

  if (theme === "blue") {
    return blueTheme;
  } else {
    if (theme === "green") {
      return greenTheme;
    } else {
      if (theme === "red") {
        return redTheme;
      }
    }
  }
};
