const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/",verifyToken,async(req,res)=>{
  const newCart = new Cart(req.body);
  try{
    const cart = await newCart.save();
    res.status(200).json(cart);
  }catch(err){
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        {"userId":req.params.id},
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
      console.log(req.params.id);
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted succesfully!");
    }catch(err){
      res.status(500).json(err);
    }
  });
  
  //GET CART INFO
  router.get("/find/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
      const cart = await Cart.findOne({userId:req.params.id});
      res.status(200).json(cart);
    }catch(err){
      res.status(500).json(err);
    }
  });
  
  //GET ALL CART
  router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
      res.status(500).json(err);
    }
  });

module.exports = router;

  