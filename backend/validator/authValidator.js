const { z } = require('zod');

//----------------- Create an object schema
const signUpValidationSchema = z
    .object({
        email: z
            .string({ required_error: "Email must be required" })
            .trim()
            .email({ message: "Invalid email" }),

        password: z
            .string({ required_error: "Passord must be required" })
            .min(6, { message: "Password must be at least 6 characters" })
            .max(1024, { message: "Password can't be greater than 1024 characters" }),

        cPassword: z
            .string({ required_error: "Confrim password must be required" })
            .min(6, { message: "Password must be at least 6 characters" })
            .max(1024, { message: "Password can't be greater than 1024 characters" }),
    })
    .superRefine(({ password, cPassword }, ctx) => {
        if (password !== cPassword) {
            ctx.addIssue({
                code: "custom",
                message: "The password and confrim password did not match"
            });
        }
    });

module.exports = signUpValidationSchema;