import joi from "joi";

export const cardCreationSchema = joi.object({
    title: joi.string().required(),
    cardNumber: joi.string().required(),
    cardHolderName: joi.string().required(),
    securityCode: joi.number().required(),
    expirationDate: joi.string().pattern(/^[0-9]{2}\/[0-9]{2}$/).message("Por favor, utilize o formato MM/YY.").required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid('credit', 'debit', 'both')
});