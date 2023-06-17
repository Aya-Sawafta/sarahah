import joi from 'joi';
export const signupSchema = {

    body: joi.object({

            username : joi.string().alphanum().min(3).max(20).required().messages({
                'any.required' : 'username required',
                'string.empty' : 'username required'
        }),
            email : joi.string().email({maxDomainSegments:3,tlds:{allow:['com','net']}}).required(),
            password : joi.string().required(),
            cPassword : joi.string().valid(joi.ref('password')).required(),
            age : joi.number().integer().min(20).max(80).required(),
            gender : joi.string().alphanum().valid('male','female').required()
        }).required(),

        query : joi.object({
            test : joi.boolean().required(),

        }).required(),
    }


export const loginSchema = {
    
 body: joi.object({
    email : joi.string().email().required(),
    password : joi.string().required()
}).required()

}