import {
  Select,
  StackProps,
  Stack,
  MenuItem,
  switchClasses,
  SelectChangeEvent,
} from "@mui/material";
import { LanguageEnum } from "../../../constant/type";
import { clientStorage } from "../../../utils/storage";
import { LANGUAGE_STORAGE_KEY } from "../../../constant";
import { memo } from "react";
import useTranslate from "../../../hooks/useTranslate";

const SwitchLanguage = (props: StackProps) => {
  const { tCommon, i18n } = useTranslate();

  const langData = [
    {
      img: "",
      alt: "USA Flag",
      content: tCommon("common.i18n.en"),
      value: LanguageEnum.EN,
    },
    {
      img: "",
      alt: "Vietnamese Flag",
      content: tCommon("common.i18n.vi"),
      value: LanguageEnum.VI,
    },
  ];

  function onChangeLanguage(lang: SelectChangeEvent) {
    const language: string = lang.target.value;
    i18n.changeLanguage(language);
    clientStorage.set(LANGUAGE_STORAGE_KEY, language);
  }

  return (
    <Stack {...props}>
      <Select
        value={i18n.language}
        onChange={onChangeLanguage}
        sx={{
          ...defaultSx,
          boxShadow: "none",
        }}
      >
        {langData.map((item) => (
          <MenuItem
            value={item.value}
            key={item.value}
            sx={{ "* > p": { marginY: "8px" } }}
          >
            <p>{item.content}</p>
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default memo(SwitchLanguage);

const defaultSx = {
  width: 162,
  height: 28,
  p: 0,
  borderRadius: 4,
  boxSizing: "border-box",
  [`&.${switchClasses.sizeSmall}`]: {
    height: 24,
    width: 48,
    [`& .${switchClasses.thumb}`]: {
      width: 20,
      height: 20,
    },
    [`& .${switchClasses.switchBase}`]: {
      [`&.${switchClasses.checked}`]: {
        left: 10,
      },
    },
  },
  [`& .${switchClasses.switchBase}`]: {
    p: 0,
    top: 2,
    left: 2,
    [`&.${switchClasses.disabled}`]: {
      opacity: 0.25,
    },
    [`&.${switchClasses.checked}`]: {
      top: 2,
      left: 14,
      [`&+.${switchClasses.track}`]: {
        borderColor: "grey.50",
        opacity: 1,
        backgroundColor: "grey.50",
      },
      [`&.${switchClasses.disabled}+.${switchClasses.track}`]: {
        opacity: 0.7,
      },
      [`& .${switchClasses.thumb}`]: {
        "&:before": {
          backgroundSize: "cover",
        },
        "&:after": {
          content: "'VN'",
          left: -22,
        },
      },
    },
  },
  [`& .${switchClasses.track}`]: {
    border: "1px solid",
    borderColor: "grey.50",
    opacity: 1,
    backgroundColor: "grey.50",
    borderRadius: 4,
  },
  [`& .${switchClasses.thumb}`]: {
    width: 24,
    height: 24,
    backgroundColor: "grey.300",
    border: "1px solid",
    borderColor: "grey.300",
    borderRadius: "50%",
    boxSizing: "border-box",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundSize: "cover",
    },
    "&:after": {
      content: "'ENG'",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 26,
      top: 0,
      fontSize: 14,
      color: "text.primary",
      fontWeight: 600,
    },
  },
};
