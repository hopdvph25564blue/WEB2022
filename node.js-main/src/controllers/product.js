import axios from "axios";
import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import Products from "../models/products";
import Category from "../models/category";
export const getAll = async (req, res) => {
    const {_page = 1, _limit = 10, _sort = "price", _order = "desc"} = req.query
    // order asc: để lấy từ bé đến lớn
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        // gửi request từ server nodes -> json-server
        // const { data: products } = await axios.get(`${process.env.API_URL}`);
        const {docs: products} = await Products.paginate({}, options)
        // Nếu mảng không có sản phẩm nào thì trả về 404
        if (products.length === 0) {
            res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        // Nếu có sản phẩm thì trả về 200 và mảng sản phẩm
        return res.status(200).json(products);
    } catch (error) {
        // Nếu có lỗi thì trả về 500 và lỗi
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate("categoryId")
        if (!product ) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
        });
    }
};
export const create = async (req, res) => {
    try {
        // const { data: product } = await axios.post(`${process.env.API_URL}`, req.body);
        const product = await Products.create(req.body)
        if (!product) {
            return res.status(400).json({
                message: "Không thể tạo sản phẩm",
            });
        }
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id,
            }
        })
        return res.status(200).json({
            message: "Product created",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        // await axios.delete(`${process.env.API_URL}/${req.params.id}`);
        await Products.findOneAndDelete({_id: req.params.id})
        return res.status(200).json({
            message: "Sản phẩm đã được xóa thành công",
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const update = async (req, res) => {
    try {
        // const { data: product } = await axios.patch(
        //     `${process.env.API_URL}/${req.params.id}`,
        //     req.body
        // );
        const product = await Products.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Sản phẩm đã được cập nhật thành công",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};