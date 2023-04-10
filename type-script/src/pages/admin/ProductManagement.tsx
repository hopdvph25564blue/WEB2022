import React, { useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface IProduct {
  _id: number|string;
  name: string;
  price: number;
  images: string;
  description: string;
  categoryId:string|number;
}

interface IProps {
  products: IProduct[];
  onRemove: (id: number | string) => void;
}

interface DataType {
  key: number|string;
  name: string;
  price: number;
  images: string;
  description: string;
  categoryId:number|string;
}

const ProductManagement = (props: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const removeProduct = (id: number |string): void => {
    const confirm = window.confirm('Ban chac chan muon xoa');
    if (confirm) {
      props.onRemove(id);
    }
  };

  const filteredData = props.products.filter((product) =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const data: DataType[] = filteredData.map((item: IProduct) => {
    return {
      key: item._id,
      name: item.name,
      price: item.price,
      images: item.images,
      description: item.description,
      categoryId:item.categoryId
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Product Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Product Image',
      dataIndex: 'images',
      key: 'images',
      render: (images: string) => <img style={{ width: '100px' }} src={images} alt="" />,
    },
    {
      title: 'Product Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: DataType) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: 'red' }}
            onClick={() => removeProduct(record.key)}
          >
            Delete
          </Button>
          <Button type="primary" style={{ backgroundColor: 'blue' }}>
            <Link to={`/admin/products/${record.key}/update`}>Update</Link>
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div>
      <Button type="primary">
        <Link  to={'/admin/products/add'}>Add New Product</Link>
      </Button>
      <Input.Search
        placeholder="Search products"
        value={searchKeyword}
        onChange={handleSearch}
        style={{ width: 250, margin: '0 0 10px 10px' }}
      />
      <Table<DataType> columns={columns} dataSource={data} pagination={{ pageSize: 10, showQuickJumper: true }} />
    </div>
  );
};

export default ProductManagement;
