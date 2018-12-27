

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
        sendAudioList : [],
        recvAudioList : [],
        textMessage: '',
        chatItems: [],
        latestPlayVoicePath: '',
        isAndroid: true,
        chatStatue: 'open',
    },


    onLoad () {
        console.error('here')
        var that =this

        this.recorder = wx.getRecorderManager();
        //音频录制完成后执行上传操作
        this.recorder.onStart (( res )  =>{
            console.debug( 'start record' )
        });
        this.recorder.onStop (( res )  =>{
            console.debug( 'end record' )
            this.uploadFile( res.tempFilePath );
        });
        
        var listeners = {
            //C2C消息事件的监听
            //群消息同理
            onMsgNotify: function(msgs){
                var recvAudioList = that.data.recvAudioList;
                for (var j in msgs) {//遍历新消息
                    var msg = msgs[j];
                    //每一条消息只有一个消息元素，因此只选第一个elem
                    var elem = msg.getElems()[0];
                    //解析这个自定义消息
                    var json = JSON.parse(elem.getContent().data);
                    if( json.type === 'audio'){
                        recvAudioList.push( json.url )
                    }
                }
                //如果是audio，就处理页面的展示逻辑
                that.setData({recvAudioList:recvAudioList})

            },
        };
        //初始化IM
        IM.login( listeners )

    },
    //页面事件绑定，长按按钮的开始
    record_start: function(){
        this.recorder.start({
            format:"mp3"
        });
    },

    //页面事件绑定，长按按钮的结束
    record_end: function(){
        this.recorder.stop();
    },

    // 简单上传文件
    uploadFile ( tempFilePath ) {
        console.error('uploadFile',tempFilePath)
        var that = this;
        Uploader.upload( tempFilePath , function(result){
            var sendAudioList = that.data.sendAudioList;
            if( Config.COSv4 ){
                var audioUrl = result.data.data.source_url.replace("http://","https://")
            }else{
                var audioUrl = result.Location.replace("http://","https://")
            }
            sendAudioList.push( audioUrl )
            //更新demo的数据展示
            that.setData( {sendAudioList: sendAudioList} )
            //发送语音消息
            var toUserId = app.globalData.toUser.identifier
            IM.sendAudioMsg(toUserId, audioUrl);
        });
    },




});