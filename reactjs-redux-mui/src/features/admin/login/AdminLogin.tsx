import React, { memo, useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Bed } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../store/app/selectors";
import { useNavigate } from "react-router-dom";
import { ADMIN_CATEGORY_PATH } from "../../../constant/paths";

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().required("Email is required"),
  password: Yup.string().trim().required("Password is required"),
});

const AdminLogin: React.FC = () => {
  const { onSignin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      try {
        await onSignin(values);
        navigate(ADMIN_CATEGORY_PATH, { replace: true });
      } catch (err: any) {
        setError(typeof err === "string" ? err : "Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 440,
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          p: { xs: 4, sm: 5 },
        }}
      >
        {/* Logo */}
        <Stack alignItems="center" spacing={1} mb={4}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              bgcolor: "rgba(19, 91, 236, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bed sx={{ fontSize: 32, color: "#135bec" }} />
          </Box>
          <Typography variant="h5" fontWeight={800} color="#0d121b">
            ThuyShop Admin
          </Typography>
          <Typography variant="body2" color="#6b7280">
            Sign in to manage your store
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}

        <Stack
          component="form"
          onSubmit={formik.handleSubmit}
          spacing={3}
          noValidate
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            placeholder="admin.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#f8f9fc",
              },
            }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#f8f9fc",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "16px",
              textTransform: "none",
              bgcolor: "#135bec",
              boxShadow: "0 4px 14px rgba(19, 91, 236, 0.4)",
              "&:hover": { bgcolor: "#0e44b3" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default memo(AdminLogin);
