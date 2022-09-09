import joi from "joi";

export const safeNotesCreationSchema = joi.object({
    title: joi.string().max(50).required(),
    note: joi.string().max(1000).required()
});