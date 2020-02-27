var express = require('express');
var router =express.Router();

router.post('/',function(req,res,next){
    data=req.body;
    //res.send(data);
    web3.eth.getAccounts().then(accounts =>{
        SMS.methods.setStudent(data.rollno,data.name,data.age,JSON.parse
            (data.indian),data.gender)
            .send({from:accounts[0],gas:600000})
            .then((txReceipt)=>{
                res.send(txReceipt)
            })
    })
})
module.exports=router