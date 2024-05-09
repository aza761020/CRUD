const express=require("express");
const mysql=require("mysql");
const cors=require("cors");

const app=express();
//app.use(express.json())
app.use(cors());


app.listen(8800,()=>{
    console.log('yes working!!!');
})

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root7610",
    database:"react"
});
 db.connect(function(err) {
     if (err) throw err;
     console.log("Connected!");
   });

   app.get("/",(req,res)=>{
    res.json("hello aza")
   });

   app.get("/items",(req,res)=>{
    const q="select * from items";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
   });

   app.post("/items",(req,res)=>{
    const q="insert into items (`title`,`desc`,`cover`) values(?)";
    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("item details saved!!!")
    })

   });

   app.delete("/items/:id",(req,res)=>{
    const bookId= req.params.id;
    const q="delete from items where id=?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("deleted")
    })
   });

   app.put("/items/:id",(req,res)=>{
    const bookId=req.params.id;
    const q="update items set `title`=?, `desc`=?, `cover`=? where id=?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("updated")
    })
   });