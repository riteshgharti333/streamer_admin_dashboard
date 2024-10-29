import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const updatePasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .min(6, "Current Password must be at least 6 characters")
    .required("Current Password is required"),
  new_password: Yup.string()
    .min(6, "New Password must be at least 6 characters")
    .required("New Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const profileSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please enter your username"),
  email: Yup.string().email().required("Please enter your email"),
});
