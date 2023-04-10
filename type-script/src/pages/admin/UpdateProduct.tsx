import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Button, Form, Input } from 'antd';
interface IProduct {
  _id:number|string,
  name:string,
  price:number,
  images?:string,
  description:string,
}
interface IProps {
    products: IProduct[],
    onUpdate: (product: IProduct) => void
}
const UpdateProductPage = (props: IProps) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState<IProduct>() 
    useEffect(() => { 
        const currentProduct = props.products.find((product: IProduct) => product._id == String(id))
        
        setProduct(currentProduct) 
    }, [props])
    useEffect(() => { 
        setFields() 
    }, [product])
    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            _id: product?._id,
            name: product?.name,
            price: product?.price,
            description: product?.description
        })
    }

    const onFinish = (values: any) => {
        props.onUpdate(values);
        navigate('/admin/products')
    };

    return (
        <div>
            <Form
                form={form}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                
                <Form.Item
                    label=""
                    name="_id"
                    style={{ display: 'none' }} // ẩn input này đi
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Bạn phải nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Bạn phải nhập giá sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[{ required: true, message: 'Bạn phải nhập mô tả sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>

               
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateProductPage