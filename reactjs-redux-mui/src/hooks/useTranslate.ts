import {useTranslation} from "react-i18next";


const useTranslate = () => {
    const {t, i18n} = useTranslation();
    const {t: tCommon} = useTranslation("translation",{
        keyPrefix: 'common'
    });
    const {t: tSignIn} =  useTranslation("translation",{
        keyPrefix: 'signIn'
    });


    return { t, i18n, tCommon, tSignIn};

}


export default useTranslate;