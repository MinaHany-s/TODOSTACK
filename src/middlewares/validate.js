
const dataMethods = ["body", "query", "params", "headers", "file", "files"];


const validate = (schema) => {
    return (req, res, next) => {
        let errArr = []
        dataMethods.forEach((key) => {
            if (schema[key]) {
                const { error } = schema[key].validate(req[key] || {}, { abortEarly: false })
                if (error) {
                    errArr.push(...error.details.map((err) => err.message));
                }
            }
        })

        if (errArr.length) {
            return res.status(400).json(
                {
                    status: "error",
                    message: `validation error`,
                    errors: errArr,
                    timestamp: new Date().toISOString()
                }
            );
        }
        next()
    }
}
export default validate