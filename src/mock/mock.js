import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import { Users } from './data/user.js'; // 导入Users数据
import {startMock,endMock} from '@/utils/dataStorage'





export default {
  /**
   * mock start
   */
  start() {
    startMock();
     // 初始化函数
    let mock = new MockAdapter(axios); // 创建 MockAdapter 实例



        //获取用户列表
    mock.onGet('/user/list').reply(config => { //  config 指 前台传过来的值  网址自己随意定义，访问时要和这个网址一致就可以，这个'/user/list'，就是get请求时的url地址
      let {name} = config.params;
      let mockUsers = Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {  //响应请求，返回数据给前台
        setTimeout(() => {
          resolve([200, {
            data:mockUsers,
            code: 200,
            message: 'SUCESS'
          }]);
        }, 1000);
      });
    });

    mock.onGet('/todo/list').reply(config => { //  config 指 前台传过来的值
      console.log("begin mokc");
      let mockTodo = Todos.map(tode => { // 重组 Todos数组，变成我们想要的数据
        return {
          id: tode.id,
          title: tode.title,
          count: tode.record.filter((data) => {
            if (data.checked === false) return true;
            return false;
          }).length, // 过滤到record里面 ‘checked’ 为true的数据，因为它们已经被完成了
          locked: tode.locked,
          isDelete: tode.isDelete
        };
      }).filter(tode => {
        if (tode.isDelete === true) return false; // 过滤掉 ‘isDelete’为true，因为已经被删除了。
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo // 返回状态为200，并且返回todos数据
          }]);
        }, 200);
      });
    });
        // 新增一条todo
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
};