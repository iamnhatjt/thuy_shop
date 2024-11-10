import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback, useMemo } from "react";
import { SigninData, signin } from "./action";
import { LanguageEnum } from "../../constant/type";
import { useTranslation } from "react-i18next";
import { clientStorage } from "../../utils/storage";
import { LANGUAGE_STORAGE_KEY } from "../../constant";
import { onExpandedSlidebar } from "./reducers";

export const useAuth = () => {
  const dispath = useAppDispatch();

  const { i18n } = useTranslation();
  const { token } = useAppSelector((state) => state.app, shallowEqual);

  const isLoggedIn = useMemo(() => !!token, [token]);

  const onSignin = useCallback(
    async (data: SigninData) => {
      try {
        return await dispath(signin(data)).unwrap();
      } catch (error) {
        throw error;
      }
    },
    [dispath],
  );

  const onChangeLanguageSystem = (language: LanguageEnum) => {
    if (!language) return;
    i18n.changeLanguage(language);
    clientStorage.set(LANGUAGE_STORAGE_KEY, language);
  };

  return {
    token,
    isLoggedIn,
    onSignin,
    onChangeLanguageSystem,
  };
};

export const useSidebar = () => {
  const dispath = useAppDispatch();

  const isExpandedSidebar = useAppSelector(
    (state) => state.app.isExpandedSlideBar,
  );

  const onToogleExandSidebar = useCallback(
    (newStatus?: boolean) => {
      dispath(onExpandedSlidebar(newStatus));
    },
    [dispath],
  );

  return {
    isExpandedSidebar,
    onToogleExandSidebar,
  };
};
