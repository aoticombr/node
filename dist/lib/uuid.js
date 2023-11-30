"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUuid = void 0;
var react_native_uuid_1 = __importDefault(require("react-native-uuid"));
function getUuid() {
    return react_native_uuid_1.default.v4();
}
exports.getUuid = getUuid;
