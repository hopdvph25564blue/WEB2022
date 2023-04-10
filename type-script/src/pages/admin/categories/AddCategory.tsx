import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm,SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd';
import { Select } from 'antd';
interface ICategory{
  _id:number |string,
  name:string,

}

interface IProps {
  onAddCategory:(category:ICategory)=>void
}


const AddCategory = (props:IProps) => {
  const navigate = useNavigate()

    const onFinish = (values: any) => {
      console.log(values);
      
      props.onAddCategory(values)
      navigate('/admin/categories')
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
                    label="Category Name"
                    name="name"
                    rules={[{ required: true,whitespace: true, message: 'Hãy nhập tên !' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Category
                    </Button>
                </Form.Item>

            </Form>

  )
}

export default AddCategory