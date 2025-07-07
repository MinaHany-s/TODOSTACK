const globalErrorHandling = (error, req, res, next) => {

    res.status(error.statusCode || 500).json({
        status: "error",
        message: `${error.message}`,
        timestamp: new Date().toISOString()
    })
    next()

}
export default globalErrorHandling