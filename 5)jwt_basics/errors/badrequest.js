const { model } = require("mongoose");
const customapierror = require("./customapierror");
const { StatusCodes } = require('http-status-codes')

class badrequest extends customapierror{
    constructor(message){
        super(message)
        this.statuscode=StatusCodes.BAD_REQUEST
    }
}
module.exports=badrequest;