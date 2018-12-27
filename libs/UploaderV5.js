

// CryptoJS 是用来计算cos上传签名的 ，如果使用的是后台的方式计算签名，无需加载。
var CryptoJS = require('crypto.js');
var CosConfig = require('config').COSv5;
var CosCloud = require('cos-wx-sdk-v5');


var TaskId;


var getAuthorization = function(options, callback) {
    // 方法一、后端通过获取临时密钥给到前端，前端计算签名
    // wx.request({
    //     method: 'GET',
    //     url: 'https://example.com/cos-js-sdk-v5/server/sts.php', // 服务端签名，参考 server 目录下的两个签名例子
    //     dataType: 'json',
    //     success: function(result) {
    //         var data = result.data;
    //         callback({
    //             TmpSecretId: data.credentials && data.credentials.tmpSecretId,
    //             TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
    //             XCosSecurityToken: data.credentials && data.credentials.sessionToken,
    //             ExpiredTime: data.expiredTime,
    //         });
    //     }
    // });


    // // 方法二、后端通过获取临时密钥，并计算好签名给到前端
    // wx.request({
    //   url: 'https://example.com/server/sts-auth.php',
    //   data: {
    //     method: options.Method,
    //     pathname: options.Key,
    //   },
    //   dataType: 'json',
    //   success: function(result) {
    //     console.log(result);
    //     var data = result.data;
    //     callback({
    //       Authorization: data.Authorization,
    //       XCosSecurityToken: data.XCosSecurityToken, // 如果是临时密钥计算出来的签名，需要提供 XCosSecurityToken
    //     });
    //   }
    // });

    // // 方法三、前端使用固定密钥计算签名（适用于前端调试）
    var authorization = CosCloud.getAuthorization({
        SecretId: CosConfig.sid,
        SecretKey:  CosConfig.skey,
        Method: options.Method,
        Key: options.Key,
        Query: options.Query,
        Headers: options.Headers,
        Expires: 60,
    });
    callback(authorization);
};

var cos = new CosCloud({
    getAuthorization: getAuthorization,
});

// 回调统一处理函数
var requestCallback = function(err, data, succ ,fail) {
    loading(0);
    console.log(err || data);
    if (err && err.error) {
        if( fail ) {
            fail( err, data );
            return
        }
        wx.showModal({
            title: '返回错误',
            content: '请求失败：' + (err.error.Message || err.error) + '；状态码：' + err.statusCode,
            showCancel: false
        });
    } else if (err) {
        if( fail ) {
            fail( err, data );
            return
        }
        wx.showModal({
            title: '请求出错',
            content: '请求出错：' + err + '；状态码：' + err.statusCode,
            showCancel: false
        });
    } else {
        if( succ ) {
            succ( data );
            return
        }
        wx.showToast({
            title: '请求成功',
            icon: 'success',
            duration: 3000
        });
    }
};

// 回调统一处理函数
function loading(isLoading, msg){
    if (isLoading) {
        wx.showToast({title: (msg || '正在请求...'), icon: 'loading', duration: 60000});
    } else {
        wx.hideToast();
    }
}

// 展示的所有接口
var dao = {
    getAuth: function() {
        var key = '1mb.zip';
        getAuthorization({
            Method: 'get',
            Key: key
        }, function(auth) {
            // 注意：这里的 Bucket 格式是 test-1250000000
            console.log('http://' + CosConfig.bucket + '.cos.' + CosConfig.region + '.myqcloud.com' + '/' + key + '?sign=' + encodeURIComponent(auth));
        });
    },
    upload: function(tempFilePath ,succ , fail){
        var extension = tempFilePath.match(/\.(.*?)$/);
        if(extension && extension[1]){
            extension = extension[1]
        }else{
            extension = "";
        }
        loading(1, '正在上传...');
        cos.postObject({
            Bucket: CosConfig.bucket,
            Region: CosConfig.region,
            Key: Math.random() +"."+ extension,
            FilePath: tempFilePath,
            TaskReady: function(taskId) {
                TaskId = taskId
            },
            onProgress: function(info) {
                console.log(JSON.stringify(info));
            }
        }, function(err, data){
            requestCallback(err, data, succ , fail)
        });
    }
};

module.exports = dao