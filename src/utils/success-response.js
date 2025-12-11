export async function successRes(res, data, statusCode = 200){
    return res.status(statusCode).json({
        statusCode,
        message: 'Success',
        data
    })
}