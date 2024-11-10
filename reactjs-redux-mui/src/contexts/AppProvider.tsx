import { Provider } from "react-redux";
import { store } from "../store/configureStore";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import ThemeProvider from "./ThemeProvider";
import { clientStorage } from "../utils/storage";
import { ACCESS_TOKEN_STORAGE_KEY } from "../constant";
import { useEffect } from "react";
import { toggleAppReady, updateAuth } from "../store/app/reducers";
import { getProfile } from "../store/app/action";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const accessToken = clientStorage.get(ACCESS_TOKEN_STORAGE_KEY);
    store.dispatch(toggleAppReady(true));

    // if (
    //   !accessToken &&
    //   ![SIGNIN_PATH, SIGNUP_PATH].some((path) =>
    //     window.location.pathname.includes(path),
    //   )
    // ) {
    //   window.location.pathname = SIGNIN_PATH;
    //   return;
    // }

    store.dispatch(updateAuth({ accessToken }));
    store.dispatch(getProfile());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
