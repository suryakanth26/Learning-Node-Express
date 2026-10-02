import { Router } from "express";
import { createUserValidationSchema } from "../util/createUserValidationSchema.mjs";
import { validationResult,matchedData,checkSchema} from "express-validator";

const router = Router();



let users = [{id : 1,username : "Surya"},
    {id : 2,username : "Pranav"},
    {id : 3,username : "Shanks"},
    {id : 4,username : "Kuma"},
    {id : 5,username : "Stella"}
]

const getUserIndex = (req,res,next) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg : "Bad Request"});
    }

    const userIndex = users.findIndex((user) =>user.id===id);console.log(userIndex);
    if(userIndex === -1){
        return res.status(404).send({msg : "Not Found :("})
    }

    req.userIndex = userIndex;
    next();
};   // Creating our own middleware

router.get("/api/",(req,res) => {
    res.cookie("user","admin",{maxAge : 60000*15})
    res.send("<h1>Welcome Home ...</h1>")
})

router.get("/api/user",(req,res) => {
    const {filter,value}=req.query;
    console.log(); 
    if(filter && value){
        return res.send(users.filter((user) => user[filter].toLowerCase().includes(value) ));
    }
    if(filter || value){
        return res.status(400).send({msg : "Bad Request :( ."})
    }
    res.send(users);
})

router.get("/api/user/:id",(req,res) => {
    const id = parseInt(req.params.id);
    console.log(id)
    if(isNaN(id)){
        return res.status(400).send({msg : "Bad Request"});
    }

    const user = users.find((user) =>user.id===id);

    if(user){
        return res.send(user);
    }
    res.status(404).send({msg : "Not Found :("})
})


router.post("/api/user",checkSchema(createUserValidationSchema),(req,res) => {


    //checkSchema checks our validation criteria and add 
    //validationResult checks req body's validator part and stores the result of error array
    //matchedData filters json body and gives validated part only !!


    const result = validationResult(req);
    //console.log(result);
    if(!result.isEmpty()){
        return res.status(400).send(result.array());
    }

    //for this case matchedData is not required .
    users.push({id : users[users.length-1].id+1 , ...req.body})
    return res.send(users[users.length-1]);
});

router.put("/api/user/:id",getUserIndex,(req,res) => {
    const userIndex = req.userIndex;
    users[userIndex] = { id : id, ...req.body};
    return res.status(200).send({msg : "Updated"});   
});

router.patch("/api/user/:id",getUserIndex,(req,res) => {
    const userIndex = req.userIndex;
    users[userIndex] = { ...users[userIndex] , ...req.body}
    return res.sendStatus(200);
});

router.delete("/api/user/:id",getUserIndex,(req,res) => {
    const userIndex = req.userIndex;
    users.splice(userIndex,1);
    return res.sendStatus(200);
});


export default router;

