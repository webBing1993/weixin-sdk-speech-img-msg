
var IM = require('../../libs/IM.js');
var Config = require('../../libs/config');
if( Config.COSv4){
    var Uploader = require('../../libs/UploaderV4.js');
}else{
    var Uploader = require('../../libs/UploaderV5.js');
}


const app = getApp()

Page({
    data: {
        sendImgList : [],
        recvImgList : [],
        textMessage: '',
        chatItems: [],
        latestPlayVoicePath: '',
        isAndroid: true,
        chatStatue: 'open'
    },


    onLoad () {
        var that = this;
        let systemInfo = wx.getSystemInfoSync();
        this.setData({
            pageHeight: systemInfo.windowHeight,
            isAndroid: systemInfo.system.indexOf("Android") !== -1,
        });


        var listeners = {
            onMsgNotify: function(msgs){
                var recvImgList = that.data.recvImgList;
                for (var j in msgs) {//遍历新消息
                    var msg = msgs[j];
                    var elem = msg.getElems()[0];
                    var json = JSON.parse(elem.getContent().data);
                    if( json.type === 'image'){
                        recvImgList.push( json.url )
                    }
                }
                that.setData({recvImgList:recvImgList})

            },
        };
        IM.login( listeners )

    },

    // 简单上传文件
    uploadImage () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                if (res.tempFilePaths && res.tempFilePaths.length) {
                    var tempFilePath = res.tempFilePaths[0];
                    that.uploadFile(tempFilePath);
                }
            }
        });
    },

    // 简单上传文件
    uploadFile ( tempFilePath ) {
        var that = this;
        Uploader.upload( tempFilePath , function(result){
            var sendImgList = that.data.sendImgList;
            //微信只能用 https
            console.debug( result );
            if( Config.COSv4 ){
                var imgUrl = result.data.data.source_url.replace("http://","https://")
            }else{
                var imgUrl = result.Location.replace("http://","https://")
            }
            
            sendImgList.push( imgUrl )
            that.setData( {sendImgList: sendImgList} )
            //发送文本消息
            var toUserId = app.globalData.toUser.identifier
            IM.sendImageMsg(toUserId, imgUrl);

        });
    }


});