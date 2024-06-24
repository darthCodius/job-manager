import { Provider } from "react-redux";
import AppLayout from "./components/AppLayout";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <Provider store={appStore}>
      <AppLayout />
    </Provider>
  );
};

export default App;
