"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleVerifyHRAndManager = void 0;
const AuthServices_1 = require("../services/AuthServices");
const roleVerifyHRAndManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqPayload = req;
        const payload = reqPayload.payload;
        const findEmployeeByUidResult = yield (0, AuthServices_1.findEmployeeByUid)({
            uid: payload.uid,
        });
        if (!findEmployeeByUidResult)
            throw new Error('User Not Found!');
        const authorized = ['HR', 'Manager'];
        if (authorized.includes(findEmployeeByUidResult === null || findEmployeeByUidResult === void 0 ? void 0 : findEmployeeByUidResult.position.name)) {
            next();
        }
        else {
            throw new Error('Unauthorized User');
        }
    }
    catch (error) {
        next(error);
    }
});
exports.roleVerifyHRAndManager = roleVerifyHRAndManager;
