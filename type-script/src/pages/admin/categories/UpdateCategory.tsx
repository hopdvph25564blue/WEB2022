import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Button, Form, Input } from 'antd';
interface ICategory {
  _id:number|string,
  name:string
}
interface IProps {
    categories: ICategory[],
    onUpdateCategory: (category: ICategory) => void
}
const UpdateCategory = (props: IProps) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [category, setCategory] = useState<ICategory>() 
    useEffect(() => { 
        const currentCategory = props.categories.find((category: ICategory) => category._id == String(id))
        setCategory(currentCategory) 
    }, [props])
    useEffect(() => { 
        setFields() 
    }, [category])
    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({ 
            _id: category?._id,
            name: category?.name,
        })
    }

    const onFinish = (values: any) => {
        props.onUpdateCategory(values);
        navigate('/admin/categories')
    };

    return (
        <div>
            <Form
                form={form}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
            >
                {/* đoạn này cần truyền cả id vào form khi submit để lấy được giá trị id truyền lên component App */}
                <Form.Item
                    label=""
                    name="_id"
                    style={{ display: 'none' }} // ẩn input này đi
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Product Category"
                    name="name"
                    rules={[{ required: true, message: 'Bạn phải nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateCategory