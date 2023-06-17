import AuthRouter from './Auth/Auth.router.js';
import MessageRouter from './Messages/Message.router.js';
import UserRouter from './Users/User.router.js';
const initApp = (app, express) => {
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.send("Hello")
    })
    app.use('/auth', AuthRouter);
    app.use('/message',MessageRouter);
    app.use('/user', UserRouter);
    app.use('/*',(req,res)=>{
        return res.json({message: 'page not found'});
      
    })
    
}

export default initApp;