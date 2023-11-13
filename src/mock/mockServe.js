// 引入 Mock 组件
import Mock from 'mockjs';
// 引入轮播,楼层的数据
import banner from './banner';
import floor from './floor';

// home 页面的轮播图接口和floor接口
// Mock使用, 第一个参数: 接口地址, 第二个参数: 返回的数据
Mock.mock("/mock/banner",{code: 200, data: banner, message: 'Request success'});
Mock.mock("/mock/floor",{code: 200, data: floor, message: 'Request Success'});