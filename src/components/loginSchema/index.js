import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().min(8).required("Password is Required")
})