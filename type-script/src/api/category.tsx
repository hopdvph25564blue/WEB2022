import instance from "./instance";

interface ICategory {
    _id:number|string,
    name : string,
}
const getAllCategory = ()=>{
    return instance.get('/categories/');
}

const deleteCategory = (id:number |string)=>{
    return instance.delete(`/categories/${id}`)
}

const addCategory = (category: ICategory)=>{
    return instance.post('/categories', category)
}
const updateCategory =(category: ICategory)=>{
    return instance.put(`/categories/${category._id}`, category)
}

export {getAllCategory,deleteCategory,updateCategory,addCategory}