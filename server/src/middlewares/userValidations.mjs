import { body } from "express-validator";

//Validações de cadastro de usuário
export const userRegisterValidations = () => {
    return[
        body("username")
        .isString()
        .withMessage("O nome de usuário é obrigatório!")
        .isLength({min: 3})
        .withMessage("O nome precisa ter no mínimo 3 caracteres!"),

        body("email")
        .isEmail()
        .withMessage("Insira um E-mail válido!")
        .isString()
        .withMessage("O E-mail é obrigatório!"),

        body("password")
        .isString()
        .withMessage("A senha é obrigatória!")
        .isLength({ min: 6 })
        .withMessage("A senha precisa ter no mínimo 6 caracteres!"),

        body("repeatPass")
        .isString()
        .withMessage("A confirmação de senha é obrigatória!")
        .custom((value, { req }) => {
            if(value !== req.body.password){
                throw new Error("As senhas não são iguais!");
            }

            return true;
        })
    ]
}

//Validações para o login
export const userLoginValidations = () => {
    return[
        body("email")
        .isString()
        .withMessage("O E-mail é obrigatório!")
        .isEmail()
        .withMessage("Informe um E-mail válido!"),

        body("password")
        .isString()
        .withMessage("A senha é obrigatória!")
    ]
}

//Validação para adição de gastos
export const user_Add_Expense_Validation = () => {
    return[
        body("value")
        .trim()
        .notEmpty()
        .withMessage("O campo do valor é obrigatório!"),

        body("description")
        .optional(),

        body("category")
        .isString()
        .withMessage("O campo de categoria é obrigatório!"),

        body("date")
        .notEmpty()
        .withMessage("O campo da data é obrigatório!")

    ]
}

