import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const blueTheme = {
  navbarColor: "#4F91FF",
  tabColor: "#4F91FF",
  routeBorderColor: "#4F91FF",
  routeTextColor: "#4F91FF",
  filterColor: "#4F91FF",
  iconColor: "#4F91FF",
};

const greenTheme = {
  navbarColor: "#00C06D",
  tabColor: "#00C06D",
  routeBorderColor: "#00C06D",
  routeTextColor: "#00C06D",
  filterColor: "#00C06D",
  iconColor: "#00C06D",
};

const redTheme = {
  navbarColor: "#FF3E3E",
  tabColor: "#FF3E3E",
  routeBorderColor: "#FF3E3E",
  routeTextColor: "#FF3E3E",
  filterColor: "#FF3E3E",
  iconColor: "#FF3E3E",
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
