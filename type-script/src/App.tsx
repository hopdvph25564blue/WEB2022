import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route,Routes } from 'react-router-dom'
// import './App.css'
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import { getAllProduct,getOneProduct,addProduct,deleteProduct,updateProduct } from './api/product'
import ProductDetail from './pages/ProductDetail'
import WebsiteLayout from './layouts/WebsiteLayout'
import AdminLayout from './layouts/AdminLayout'
import AddProduct from './pages/admin/AddProduct'
import ProductManagement from './pages/admin/ProductManagement'
import UpdateProduct from './pages/admin/UpdateProduct'
import CategoriesManagement from './pages/admin/categories/CategoriesManagement'
import { addCategory, deleteCategory, getAllCategory, updateCategory } from './api/category'
import AddCategory from './pages/admin/categories/AddCategory'
import UpdateCategory from './pages/admin/categories/UpdateCategory'
import Signin from './pages/signin'
import Signup  from './pages/signup'

interface IProduct {
  _id:number | string,
  name:string,
  price:number,
  images:string,
  description:string
}
interface ICategory {
  _id:number|string,
  name:string,
}
function App() {
  //PRODUCT
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(()=>{
    getAllProduct().then(({data})=>setProducts(data))
  },[])
const onHandleRemove = (id:number)=>{
  deleteProduct(id).then(()=>setProducts(products.filter((item:IProduct)=>item._id !== id)));
}
const onHandleAdd = (product:IProduct)=>{
  addProduct(product).then(()=>setProducts([...products,product]))
}
const onHandleUpdate =(product:IProduct)=>{
  updateProduct(product).then(() => setProducts(products.map((item) => item._id == product._id ? product : item)))
}
//CATEGORY
const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(()=>{
    getAllCategory().then(({data})=>setCategories(data))
  },[])
  const onHandleRemoveCategory = (id:number)=>{
    deleteCategory(id).then(()=>setCategories(categories.filter((item:ICategory)=>item._id !== id)));
  }
  const onHandleAddCategory = (category:ICategory)=>{
    addCategory(category).then(()=>setCategories([...categories,category]))
  }
  const onHandleUpdateCategory =(category:ICategory)=>{
    updateCategory(category).then(() => setCategories(categories.map((item) => item._id == category._id ? category : item)))
  }
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<WebsiteLayout />}>
                <Route index element={<Product products={products} />}/>
                <Route path='products' >
                  <Route index element={<Product products={products} />} />
                  <Route path=':id' element={<ProductDetail />}/>
                </Route>
            </Route>
            <Route path='/' element={<AdminLayout />}>
          <Route path='admin'>
            <Route path='products'>
              <Route index element={<ProductManagement products={products} onRemove={onHandleRemove} />}/>
              <Route path='add' element={<AddProduct onAdd={onHandleAdd}/>} />
              <Route path=':id/update' element={<UpdateProduct onUpdate={onHandleUpdate} products={products} />} />
            </Route>
            <Route path='categories'>
              <Route index element={<CategoriesManagement categories={categories} onRemove={onHandleRemoveCategory} />}/>
              <Route path='add' element={<AddCategory onAddCategory={onHandleAddCategory}/>} />
              <Route path=':id/update' element={<UpdateCategory onUpdateCategory={onHandleUpdateCategory} categories={categories} />} />
            </Route>
          </Route>
          </Route>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
        </Routes>
    </div>
  )
}

export default App
