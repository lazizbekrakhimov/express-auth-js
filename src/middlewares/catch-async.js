export const catchAsync = fc => {
    return function (req, res, next){
        fc(req, res, next).catch(next)
    }
}