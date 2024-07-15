import express from 'express'
import authMiddleware from "../middleware/auth.js"
import { placeOrder, userOrders, verifyOrder,listOrders, updateStatus } from '../controllers/orderControllers.js'

const orderRouter= express.Router();

//the middleware added in the route is to get the user ID after decoding the token it will add the user Id to the models 

orderRouter.post("/place", authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get('/list',listOrders)
orderRouter.post("/status",updateStatus )


export default orderRouter;