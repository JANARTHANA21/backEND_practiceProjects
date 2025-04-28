const ImdbModel=require('../models');
const express=require('express');
const router=express.Router();
router.post('/movies',async(req,res)=>{
    const data = new ImdbModel({
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        genre: req.body.genre,
        director: req.body.director,
        actor: req.body.actor,
        images: req.body.images,
        imdbrating: req.body.imdbrating,
        imdbId: req.body.imdbId,
    });
    
    

        try {
            const datatosave=await data.save();
            res.status(201).json(datatosave);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
})

router.get('/movies/:id',async(req,res)=>{
    try{
     const data=await ImdbModel.findById(req.params.id);
     res.json(data);
    }catch(err){
        res.status(500).json({message:err.message})
    }

})


module.exports=router;