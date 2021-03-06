/**
 * Created by wbt on 2018/2/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import app from './app/app';
import user from './user/user';
import card from './card/card';
import async from './dynamic/async';
import qrcode from './qrcode/qrcode';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    card,
    async,
    qrcode
  }
});

export default store;

