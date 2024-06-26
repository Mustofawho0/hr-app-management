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
exports.updateEmployeVerifyToken = exports.createEmployee = exports.updateLeaveRequest = void 0;
const connection_1 = require("../../connection");
const date_fns_1 = require("date-fns");
const updateLeaveRequest = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    return yield connection_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updateLeaveRequest = yield tx.leaveRequest.update({
            data: {
                status: 'APPROVED',
            },
            where: {
                id,
            },
        });
        const findEmployee = yield tx.employee.findUnique({
            where: {
                uid: updateLeaveRequest.employeeId,
            },
            include: {
                shift: true,
            },
        });
        if (!findEmployee)
            return null;
        let startLeaveDate = updateLeaveRequest.stardDate;
        const endLeaveDate = updateLeaveRequest.endDate;
        const dates = [
            {
                date: new Date(endLeaveDate),
                clockin: new Date(findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.shift.start),
                clockout: new Date(findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.shift.end),
                employeeId: updateLeaveRequest.employeeId,
                deduction: 0,
            },
        ];
        while ((0, date_fns_1.isBefore)(startLeaveDate, endLeaveDate)) {
            if (!(0, date_fns_1.isWeekend)(startLeaveDate)) {
                dates.unshift({
                    date: new Date(startLeaveDate),
                    clockin: new Date(findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.shift.start),
                    clockout: new Date(findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.shift.end),
                    employeeId: updateLeaveRequest.employeeId,
                    deduction: 0,
                });
            }
            startLeaveDate = (0, date_fns_1.addDays)(startLeaveDate, 1);
        }
        yield tx.attendance.createMany({
            data: [...dates],
        });
        yield tx.employee.update({
            data: {
                leaveBalance: (findEmployee === null || findEmployee === void 0 ? void 0 : findEmployee.leaveBalance) - dates.length,
            },
            where: {
                uid: updateLeaveRequest.employeeId,
            },
        });
    }));
});
exports.updateLeaveRequest = updateLeaveRequest;
const createEmployee = (_b) => __awaiter(void 0, [_b], void 0, function* ({ email, fullname, password, positionId, shiftId, address, }) {
    return yield connection_1.prisma.employee.create({
        data: {
            email,
            fullname,
            password,
            positionId,
            shiftId,
            address,
        },
    });
});
exports.createEmployee = createEmployee;
const updateEmployeVerifyToken = (_c) => __awaiter(void 0, [_c], void 0, function* ({ uid }) {
    yield connection_1.prisma.employee.update({
        where: {
            uid: uid,
        },
        data: {
            status: 'VERIFY',
        },
    });
});
exports.updateEmployeVerifyToken = updateEmployeVerifyToken;
