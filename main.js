import Vue from 'vue'
import App from './App'

import request from './components/request.js'
Vue.prototype.request=request

import moment from 'moment'
Vue.prototype.moment=moment

// 日期过滤器
Vue.filter('dateStr', function (value, format){
    return moment(value).format(format || 'YYYY年MM月DD日 hh:mm:ss')
})
Vue.config.productionTip = false

//定义全局的地址
Vue.prototype.$Url='http://localhost:8080'


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
