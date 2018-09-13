const app = getApp()

Page({
    data: {
        boards: [
            { key: 'in_theaters' },
            { key: 'coming_soon' },
            { key: 'new_movies' },
            { key: 'top250' }
        ]
    },

    onLoad() {
        wx.showLoading({ title: '正在加载中...' })

        const tasks = this.data.boards.map(board => {
            return app.douban.find(board.key, 1, 8)
                .then(d => {
                    board.title = d.title
                    board.movies = d.subjects
                    return board
                })
        })

        Promise.all(tasks).then(boards => {
            this.setData({ boards: boards, loading: false })
            wx.hideLoading()
        })
    }
})