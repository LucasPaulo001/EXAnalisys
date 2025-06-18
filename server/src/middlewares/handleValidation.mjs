import { validationResult } from "express-validator";

//Middleware de captura de erros das requisições
const validate = (req, res, next) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    const extratedErros = []

    errors.array().map((err) => extratedErros.push(err));

    return res.status(422).json({ errors: extratedErros });
}

export default validate;