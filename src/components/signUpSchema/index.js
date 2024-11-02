import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().min(3).max(25).required("Name is Required"),
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().min(8).required("Password is Required"),
    confirmPassword: Yup.string().required("Password is Required").oneOf([Yup.ref("password"), null], "Password Didnt match")
})