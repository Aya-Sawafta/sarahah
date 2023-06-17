export const asyncHandler = (func)=>{
    return (req,res)=>{
        func(req,res).catch(err=>{
            return res.status(500).json({message:"catch error",error:err.stack});
        });
    }
} 