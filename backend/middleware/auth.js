import jwt from "jsonwebtoken"

// the auth middle ware works with the add to cart,remove from cart and get all cart functions 
//the middle ware helps to update the cart data that is set in the user models 

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next()
    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware