import React, { useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface ICategory {
  _id: number|string;
  name: string;

}

interface IProps {
  categories: ICategory[];
  onRemove: (id: number | string) => void;
}

interface DataType {
  key: number|string;
  name: string;

}

const CategoriesManagement = (props: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const removeCategory= (id: number |string): void => {
    const confirm = window.confirm('Ban chac chan muon xoa');
    if (confirm) {
      props.onRemove(id);
    }
  };

  const filteredData = props.categories.filter((category) =>
  category.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const data: DataType[] = filteredData.map((item: ICategory) => {
    return {
      key: item._id,
      name: item.name,
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
      title: 'Action',
      key: 'action',
      render: (record: DataType) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ backgroundColor: 'red' }}
            onClick={() => removeCategory(record.key)}
          >
            Delete
          </Button>
          <Button type="primary" style={{ backgroundColor: 'blue' }}>
            <Link to={`/admin/categories/${record.key}/update`}>Update</Link>
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
        <Link to={'/admin/categories/add'}>Add Category</Link>
      </Button>
      <Input.Search
        placeholder="Search categories"
        value={searchKeyword}
        onChange={handleSearch}
        style={{ width: 250, margin: '0 0 10px 10px' }}
      />
      <Table<DataType> columns={columns} dataSource={data} pagination={{ pageSize: 10, showQuickJumper: true }} />
    </div>
  );
};

export default CategoriesManagement;
