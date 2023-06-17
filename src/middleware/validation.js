const requestMethod = ['body' , 'query' , 'params'];
const validation =(schema) =>{

    return(req , res , next)=>{
    const validationArray = [];
         requestMethod.forEach(key=>{
            if(schema[key]){
                const validationResult = schema[key].validate(req[key],{abortEarly:false});
                if(validationResult.error){
                validationArray.push(validationResult);
                }
     }
         })
         if(validationArray.length > 0){
            return res.json({message:'validation error',validationArray})
         }
         else{
            return next();
         }
    }
}
   

export default validation;