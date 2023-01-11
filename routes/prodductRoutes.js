import express from 'express'

import {
  getProducts,
  getProductbyId,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMddileware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top',getTopProducts)
router
  .route('/:id')
  .get(getProductbyId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

// import AsyncHandler from 'express-async-handler'
// import Product from '../models/productModel.js'
// const router=express.Router();
// router.get('/',AsyncHandler(async (req,res)=>{
//     const products= await Product.find({})

//     res.json(products)
// }))

// router.get('/:id',AsyncHandler(async(req,res)=>{
//     const product = await Product.findById(req.params.id)

//     if(product){
//     res.json(product)
//     } else{
//         res.status(404)
//         throw new Error('Product not Found')
//     }
// }))

export default router
