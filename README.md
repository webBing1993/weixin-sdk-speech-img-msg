# webim-MiniProgram-demo

#### 项目介绍
webim-MiniProgram-demo

> 特别重要

本demo依赖腾讯云COS https://console.qcloud.com/cos 请先开通cos服务
本demo发消息使用的是自定义消息，需要业务侧在接收端也要做相应的解析处理

#### 目录介绍
- demo 
    - image - 图片收发的demo
    - audio - 语音收发的demo
    - images - 图片资源文件
    - index - demo入口
- libs 
    - config.js - 配置文件
    - cos-wx-sdk-v4.js  - cos 上传库
    - crypto.js   算cos上传签名的库，如果使用后台算签名不需要加载
    - IM.js - demo的IM处理封装
    - Uploader.js - 上传接口的处理封装
    - webim_wx.js  - IMSDK

#### demo体验流程

1. 配置 libs/config文件
```javascipt
    module.exports = {
        COS : {
            appid: '12345678', // Bucket 所属的项目 ID
            bucket: "imsdk", // 空间名称 Bucket ,记住是 - 的前半部分，不包括后面的数字部分
            region: 'gz', // bucket 的地域简称，华南：gz，华北：tj，华东：sh
            sid: '........', // 项目的 SecretID
            skey: '......' // 项目的 Secret Key
        },
        IM : {
            sdkAppID: 14000xxxxx,
            appIDAt3rd: 14000xxxxx, //用户所属应用id，必填
            accountType: xxxxx, //用户所属应用帐号类型，必填
        }
    };
```
2. 配置 app.js 的 globalData
> 设置两个测试用户的id和usersig
```javascript
        user: [
            {
                identifier:"user_a",
                label:"用户A",
                userSig:"xxxxxx"
            },
            {
                identifier:"user_b",
                label:"用户B",
                userSig:"xxxxxx"
            }
        ],
```
3. 安全域名设置不校验，上线前需要设置 COS 的安全域名
