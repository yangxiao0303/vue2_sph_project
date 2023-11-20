import { v4 as uuidv4 } from 'uuid';

export default function GetUserTempId() {
    //先判断本地存储是否有用户临时登录身份标识
    let userId = localStorage.getItem('USER_ID');
    //如果没有用户身份-创建一个
    if (!userId) {
        userId = uuidv4();
        localStorage.setItem('USER_ID', userId);
    }
    return userId;
}