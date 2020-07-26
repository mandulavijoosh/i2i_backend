const express = require("express");
const router = express.Router();
const { check, validationResult} = require("express-validator/check");



var Book= require("../Schemass/bookSchema");

router.post("/bookspost",
[
    check("bookid", "Please Enter a Valid bookid")
    .not()
    .isEmpty(),
    check("bookname","Please enter a  bookname").not().isEmpty(),
    check("author","Please enter the author name").not().isEmpty()],
async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const{
        bookid,
        bookname,
        description,
        author,
        likes,
        viewcount,
        publishedLink,
        category=[],
        audiolinks=[]
    }=req.body; 
    book=new Book({
        bookid,
        bookname,
        description,
        author,
        likes,
        viewcount,
        publishedLink,
       category,
       audiolinks
        
       });

       console.log(req.body)
        book.save();
}
    
);

router.get("/bookget",  (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const bid=req.body.bookid;
         Book.find({},function(err,result){
            if(err) throw err;
            console.log(result);
            var resu=result.filter((x) => {return (x.bookid==bid);});
            console.log(resu);
            res.json(resu);
        });
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }
    });

router.delete('/delbook' + '/:id',function(req,res){
    Book.remove({
        bookid: req.params.id
    },function(err){
        if(err){
        return res.send("Cannot delete!!!");
    }
    else
    {
        console.log("sucessfully deleted");
        res.send("sucessfully deleted");
    }})
});



module.exports=router;