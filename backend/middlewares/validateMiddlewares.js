
//custom Express middleware for request validation using Zod
const validate = (schema) => async (req, res, next) => { //it takes a Zod schema as an argument and returns a middleware function
    try {
        const parseBody = await schema.parseAsync(req.body); //If valid, Zod returns the parsed body (sanitized and trimmed).
        req.body = parseBody; //It replaces req.body with the clean, validated data.
        next(); //Then it calls next() to move to the controller (e.g., authController.register)
    } catch (err) {
        res.status(400).json({
            message: err?.issue[0]?.message, //if fails validation -> Zod returns an issues array with all validation errors, first error message to the client with status 400 Bad Request
        });
    }
};

module.exports = validate;