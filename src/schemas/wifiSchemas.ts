import joi from "joi";

export const wifiCreationSchema = joi.object({
    networkName: joi.string().required(),
    password: joi.string().required(),
    title: joi.string().required()
});