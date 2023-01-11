import express from 'express';

import { addOrderItems,getOrderById ,updateOrderToPaid,getMyOrders,getOrders, updateOrderToDelivered} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMddileware.js';


const router=express.Router();


router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)//api/orders
router.route('/myorders').get(protect,getMyOrders)//api/orders/myorders

router.route('/:id').get(protect,getOrderById)//api/orders/:id

router.route('/:id/pay').put(protect,updateOrderToPaid)//api/orders/:id/pay

router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)//api/orders/:id/pay


export default router