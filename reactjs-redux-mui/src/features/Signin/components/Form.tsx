import {Box, Button, Checkbox, Stack, Typography} from "@mui/material";
import {memo, useState} from "react";
import * as Yup from "yup";
import {EMAIL_REGEX} from "../../../constant/regex";
import {useFormik} from "formik";
import Iconify from "../../../layouts/sharedComponents/Iconify";
import InputCustom from "../../../layouts/sharedComponents/InputCustom";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {useAuth} from "../../../store/app/selectors";
import {SigninData} from "../../../store/app/action";
import useTranslate from "../../../hooks/useTranslate";

const BG_Login = '/assets/images/backgrounds/bg-login.png'

const Form = () => {
    const [isShowPassword, setShowPassword] = useState(false);
    const {isMdSmaller} = useBreakpoint();
    const {onSignin} = useAuth();
    const {tSignIn} = useTranslate();
    const onSubmit = async (value: SigninData) => {
        onSignin(value);
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .trim()
            .required("Email is required")
            .matches(EMAIL_REGEX, "Email in valid"),
        password: Yup.string()
            .trim()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(30, "Password must be at max 30 characters"),
    })

    const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
    });

  return (
      <Box display="flex" justifyContent="center" height="100vh" alignItems="center"
           sx={{backgroundImage: `url(${BG_Login})`, backgroundRepeat: "none"}}>
          <Box sx={{
              backgroundColor: 'background.paper',
              width: isMdSmaller ? '100%' : '60%',
              height: 'fit-content',
              padding: '52px 122px',
              maxWidth: '800px',
              borderRadius: '16px'
          }}>
              <Stack
                  flex={1}
                  component="form"
                  width="100%"
                  maxHeight="100%"
                  mt={3}
                  spacing={3}
                  overflow="hidden"
                  onSubmit={formik.handleSubmit}
                  noValidate
              >
                  <Stack justifyContent="center" flex={1} overflow="auto" spacing={3}>
                      <Stack direction="column" alignItems="center" spacing={1}>
                          <Typography variant="h4" fontWeight='600'>{tSignIn('title')}</Typography>
                          <Stack direction="row" spacing={1}>
                              <Typography variant='subtitle1'>{tSignIn('subtitle')}</Typography>
                              <Typography variant='subtitle1' color='primary.main'>{tSignIn('signUp')}</Typography>
                          </Stack>
                      </Stack>
                      <InputCustom
                          fullWidth
                          autoFocus
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="Email Adress"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                      />
                      <InputCustom
                          fullWidth
                          id="password"
                          name="password"
                          label="Password"
                          type={isShowPassword ? "password" : "text"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                          InputProps={{
                              endAdornment: (
                                  <Iconify
                                      icon={
                                          !isShowPassword
                                              ? "weui:eyes-off-filled"
                                              : "weui:eyes-on-outlined"
                                      }
                                      onClick={() => {
                                          setShowPassword((current) => !current);
                                      }}
                                  />
                              ),
                          }}
                      />
                      <Stack
                          direction='row' justifyContent='space-between' alignItems="center" mt={2}>
                          <Stack direction='row' alignItems="center" spacing={2}>
                              <Checkbox sx={{padding: 0}}/>
                              <Typography variant='body1'>{tSignIn('remember')}</Typography>
                          </Stack>
                          <Typography variant='body1' color='primary.main'>{tSignIn('forgot')}</Typography>
                      </Stack>
                      <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          sx={{
                              mt: 3,
                          }}
                          size="large"
                          color="primary"
                      >
                          <Typography variant="button">{tSignIn('button1')}</Typography>
                      </Button>
                      <Button variant='outlined' sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }}>
                          <Typography variant="button">{tSignIn('button2')}</Typography>
                          <Iconify icon='devicon:google' />
                      </Button>

                  </Stack>
              </Stack>

          </Box>

      </Box>
  );
};

export default memo(Form);

const INITIAL_VALUES = {
  email: "",
  password: "",
};
