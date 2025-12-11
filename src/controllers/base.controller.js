import { isValidObjectId } from "mongoose";

import { catchAsync } from "../middlewares/catch-async.js";
import { ApiError } from "../utils/custom-error.js";
import { successRes } from "../utils/success-response.js";

export class BaseController {
    constructor(model, relation) {
        this.model = model;
        this.relation = relation
    }

    create = catchAsync(async (req, res) => {
        const createdData = await this.model.create(req.body);
        return successRes(res, createdData, 201)
    })

    findAll = catchAsync(async (_req, res) => {
        const data = await this.model.find().populate(this.relation);
        return successRes(res, data)
    })

    findOne = catchAsync(async (req, res) => {
        const data = await this._getById(req.params?.id);
        return successRes(res, data)
    })

    update = catchAsync(async (req, res) => {
        const id = req.params?.id;
        await this._getById(id);
        const updatedData = await this.model.findByIdAndUpdate(id, req.body, { new: true });
        return successRes(res, updatedData)
    })

    remove = catchAsync(async (req, res) => {
        const id = req.params?.id;
        await this._getById(id);
        await this.model.findByIdAndDelete(id);
        return successRes(res, {})
    })

    async _getById(id) {
        if (!isValidObjectId(id)) {
            throw new ApiError('Invalid object ID', 400)
        };
        const data = await this.model.findById(id).populate(this.relation);
        if (!data) {
            throw new ApiError('Not found', 404)
        };
        return data
    }

    async _isExist(property, message) {
        const existsData = await this.model.findOne(property);
        if (existsData){
            throw new ApiError(`${message} already exist`, 409)
        }
    }
}