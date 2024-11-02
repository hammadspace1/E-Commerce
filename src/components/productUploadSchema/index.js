import * as Yup from "yup";

export const productUploadSchema = Yup.object({
    productName: Yup.string().min(3).max(25).required("Name is Required"),
    productDescription: Yup.string().required("Discription is Required"),
    productPrice: Yup.string().min(2).required("Price is Required"),
    productCategory: Yup.string().required("Category is Required")
})