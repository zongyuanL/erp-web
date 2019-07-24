//user.js
import Mock from 'mockjs'; // 导入mockjs 模块
let Users = []; // 定义我们需要的数据，后面导出
const COUNT = [1, 2, 3, 4, 5]; // 定义我们需要数量，即生成几条模拟数据
for (let i = 1; i <= COUNT.length; i++) {
  Users.push(Mock.mock({ // 根据数据模板生成模拟数据。
    id: Mock.Random.guid(), // 随机id
    title: Mock.Random.first(), // 随机标题
        name:Mock.Random.cname(),  //随机中文名
        addr: Mock.mock('@county(true)'),  //随机地址
    'age|18-60': 1,  //随机年龄
    birth: Mock.Random.date(),  //随机生日
    sex: Mock.Random.integer(0, 1),  //随机性别
    isDelete: false, //是否删除
    locked: Mock.Random.boolean(), // 随机锁定
    record: COUNT.map(() => { // ×××单项列表的数据
      return {
        text: Mock.Random.cparagraph(2), // 随机内容
        isDelete: false, //是否删除
        checked: Mock.Random.boolean()  //是否完成
      };
    })
  }));
}
export { // 导出用户数据
  Users
};