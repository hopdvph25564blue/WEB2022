import instance from "./instance";


interface IProduct {
    _id:number | string,
    name : string,
    price: number,
    images:string,
    description:string,
    categoryId:string|number

}
const getAllProduct = ()=>{
    return instance.get('/products/');
}

const getOneProduct = (id:number | string)=>{
    return instance.get('/products/'+id)
}

const deleteProduct = (id:number | string)=>{
    return instance.delete(`/products/${id}`)
}

const addProduct = (product: IProduct)=>{
    return instance.post('/products', product)
}
const updateProduct =(product: IProduct)=>{
    return instance.put(`/products/${product._id}`, product)
}

export {getAllProduct, getOneProduct, deleteProduct, addProduct, updateProduct}