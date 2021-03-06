import {otherRouter, appRouter} from '@/router/router';

const app = {
  state: {
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    currentPath: [], // 面包屑数组
    menuList: [],
    routers: [
      otherRouter,
      ...appRouter
    ]
  },
  mutations: {
    updateMenulist(state) {
      let menuList = [];
      appRouter.forEach((item, index) => {
        let len = menuList.push(item);
        let childrenArr = item.children.filter(child => child);
        if (childrenArr === undefined || childrenArr.length === 0) {
          menuList.splice(len - 1, 1);
        } else {
          let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
          handledItem.children = childrenArr;
          menuList.splice(len - 1, 1, handledItem);
        }
      });
      state.menuList = menuList;
    },
    changeMenuTheme(state, theme) {
      state.menuTheme = theme;
    },
    changeMainTheme(state, mainTheme) {
      state.themeColor = mainTheme;
    },
    addOpenSubmenu(state, name) {
      [...name].forEach(m => {
        state.openedSubmenuArr.push(m)
      })
    },
    setCurrentPath(state, pathArr) {
      state.currentPath = pathArr;
    }
  }
};

export default app;
