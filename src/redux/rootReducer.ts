import user from "./features/user";
import selector from "./features/selector";
import favorite from "./features/favorite";
import cart from "./features/cart";
import theme from "./features/theme";
import filterWord from "./features/filterWord";

const rootReducer = {
  user,
  selector,
  favorite,
  cart,
  theme,
  filterWord
};

export default rootReducer;
