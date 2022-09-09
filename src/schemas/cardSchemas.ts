import joi from "joi";

export const cardCreationSchema = joi.object({
    title: joi.string().required(),
    cardNumber: joi.string().required(),
    cardHolderName: joi.string().required(),
    securityCode: joi.string().required(),
    expirationDate: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid('credit', 'debit', 'both')
});