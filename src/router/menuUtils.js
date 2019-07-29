import loadRoutes from './loadRoutes'

export default (menuList,routers, data) => {
  //转换服务端菜单数据，拿到自己想要的字段，比如这里的路由路径component (或者其他的key)
  generaMenu(menuList,routers, data)
}

function generaMenu(menuList, routers, data) {
  if (data) {
    let menu = {};
    menu.name = data.name;
    if(data.icon != undefined){menu.icon = data.icon};

    if(data.path != undefined){
      menu.path = data.path

      let router = {};
      router.path = data.path;
      router.name = data.name;
      router.meta ={};
      if(data.title != undefined ){router.meta.title = data.title};
      if(data.keepAlive != undefined ){router.meta.keepAlive = data.keepAlive};
      // router.component =  loadRoutes (data.component);
      router.component =  resolve => require(['@/views/'+data.component+'.vue'], resolve);
      routers.push(router);
    }

     menuList[data.id] = menu;

    if(data.children != undefined && data.children.length > 0){
      menuList[data.id].children={};
      let _children = menuList[data.id].children;
      data.children.forEach((item) => {
        generaMenu(_children, routers, item);
      })
    }
  }
}
