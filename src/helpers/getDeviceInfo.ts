import parser from "ua-parser-js";

export const getDeviceInfo = (req)=>{
    const ua = new parser(req.headers['user-agent']);
    const {type} = ua.getDevice();
    return type
}