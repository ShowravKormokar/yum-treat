require('dotenv').config();
const mongoose = require('mongoose'); // For mongodb schema, model and queries
const bcrypt = require('bcrypt'); // For hashing password securely
const jwt = require('jsonwebtoken'); // To generate and verify JWTs for user authentication


/* ----------------------- Create schema for sign up ----------------------- */
const signUpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        cPassword: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "manager", "user"]
        }
    },
    {
        timestamps: {
            createdAt: "created_at", // When the user created
            updatedAt: "updataed_at" // When it was last update
        }
    }
);


/* ---------------------- Secure password using bcrypt ---------------------- */
signUpSchema.pre("save", async function (next) {

    // The current user document
    const user = this;
    // Has this field been changed/updated? =This avoids re-hashing already hashed passwords during updates.
    if (!user.isModified("password", "cPassword")) {
        next(); //Continue with the save if no hashing needed
    }

    try {
        const saltRounds = await bcrypt.genSalt(10); //creates a random string (salt) that’s added to the password before hashing.
        const hash_password = await bcrypt.hash(user.password, saltRounds);
        user.password = hash_password;
        user.cPassword = hash_password;
    } catch (err) {
        next(err);
    }
});


/*----------------------- Compare password --------------------- */
signUpSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

/*---------------------- JSON web token ----------------------- */
// jwt.sign(payload, secret, options)
signUpSchema.methods.generateToken = async function () { //Adds a method to create JWT tokens
    try {
        return jwt.sign( //Sets token validity duration
            {
                userId: this._id.toString(),
            },
            process.env.JWT_SECRET_KEY, //Used to sign and later verify the token
            {
                expiresIn: "30d" //Sets token validity duration
            }
        );
    } catch (err) {
        console.error(err);
    }
};

const SignUp = new mongoose.model("userSignUp", signUpSchema);

module.exports = SignUp;