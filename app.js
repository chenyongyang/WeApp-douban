const wechat = require('./utils/wechat.js')
const douban = require('./utils/douban.js')
const baiduMap = require('./utils/baiduMap.js')

App({
    data: {
        name: 'Douban Movie',
        version: '0.1.0',
        currentCity: '深圳'
    },
    wechat: wechat,
    douban: douban,
    baiduMap: baiduMap,
    onLaunch() {
        wechat
            .getLocation()
            .then(res => {
                const { latitude, longitude } = res
                return baiduMap.getCityName(latitude, longitude)
            })
            .then(name => {
                this.data.currentCity = name.replace('市', '')
                console.log(`currentCity : ${this.data.currentCity}`)
            })
            .catch(err => {
                this.data.currentCity = '北京'
                console.error(err)
            })
    }
})