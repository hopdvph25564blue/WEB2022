import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm,SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd';
import { Select } from 'antd';
interface IProduct{
  _id:number |string,
  name:string,
  price:number,
  image: string,
  description:string
}
interface IFormInput{
  name:string,
  price:number
  image: any
}
interface IProps {
  onAdd:(product:IProduct)=>void
}


const AddProduct = (props:IProps) => {
  const navigate = useNavigate()
  const { Option } = Select;

    const onFinish = (values: any) => {
      console.log(values);
      
      props.onAdd(values)
      navigate('/admin/products')
    };
  return (
    <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true,whitespace: true, message: 'Hãy nhập tên !' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true,whitespace: true, message: 'Hãy nhập giá!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product description"
                    name="description"
                    rules={[{ required: true,whitespace:true, message: 'Hãy nhập mô tả sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>

            </Form>

  )
}

export default AddProduct