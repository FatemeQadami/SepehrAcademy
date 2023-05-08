import user from "./features/user";
import selector from "./features/selector";
import favorite from "./features/favorite";
import cart from "./features/cart";
import theme from "./features/theme";
import search_filter from "./features/search_filter";

const rootReducer = {
  user,
  selector,
  favorite,
  cart,
  theme,
  search_filter,
};

export default rootReducer;
