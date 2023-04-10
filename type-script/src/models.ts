import * as Yup from "yup"

export interface IProduct {
    id: string,
    name: string,
    price: number,
    original_price: number,
    description: string,
    images: string ,
    brand: {
        id: number,
        name: string,
        slug: string
    },
    specifications: ISpecification[]
}

export interface ISpecification {
    name: string,
    attributes: {
        code: string,
        name: string,
        value: string
    }
}

export const signupSchema = Yup.object({
    name:Yup.string().required('Bắt buộc nhập name'),
    email: Yup.string().email('Email sai định dạng').required('Bắt buộc nhập email'),
    password: Yup.string().min(6).required('Bắt buộc nhập password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp"),
})
export type SignupForm = Yup.InferType<typeof signupSchema>

export const signinSchema = Yup.object({
    email: Yup.string().email('Email sai định dạng').required('Bắt buộc nhập email'),
    password: Yup.string().min(6).required('Bắt buộc nhập password')
})

export type SigninForm = Yup.InferType<typeof signinSchema>
