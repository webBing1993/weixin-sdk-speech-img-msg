const app = getApp()
Page({
    data: {
        grids: [
            {
                name:"audio",
                label:"语音消息"
            },
            {
                name:"image",
                label:"图片消息"
            }
        ],
        user: app.globalData.user,
        show_grid:false,
        show_user:true
    },

    onLoad () {
        let systemInfo = wx.getSystemInfoSync();
        this.setData({
            pageHeight: systemInfo.windowHeight,
            isAndroid: systemInfo.system.indexOf("Android") !== -1,
        });
    },

    // 选择用户
    chooseUser: function ( e ) {
        var userid = e.currentTarget.dataset.userid
        this.setData({show_user:false,show_grid:true});

        //设置全局的当前用户和对方
        this.data.user.forEach(function(item){
            if( item.identifier === userid ){
                app.globalData.fromUser = item;
            }else{
                app.globalData.toUser = item;
            }
        })
    },
    // 回调统一处理函数
    loading: function (isLoading, msg) {
        if (isLoading) {
            wx.showToast({title: (msg || '正在请求...'), icon: 'loading', duration: 60000});
        } else {
            wx.hideToast();
        }
    }

});
