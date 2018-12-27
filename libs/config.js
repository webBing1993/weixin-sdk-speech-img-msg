module.exports = {
   /*  COSv4 : {
        appid: '1253488539', // Bucket 所属的项目 ID
        bucket: "imsdk", // 空间名称 Bucket ,记住是 - 的前半部分，不包括后面的数字部分
        region: 'gz', // bucket 的地域简称，华南：gz，华北：tj，华东：sh
        sid: '', // 项目的 SecretID
        skey: '' // 项目的 Secret Key
    }, */
    COSv5 : {
        appid: '1253488539', // Bucket 所属的项目 ID
        bucket: "mp-xxxx",  //空间名称 Bucket
        region: 'ap-xxx', //
        sid: 'xxx', // 项目的 SecretID
        skey: 'xxx' // 项目的 Secret Key
    },
    IM : {
        sdkAppID: 1400037025,
        appIDAt3rd: 1400037025, //用户所属应用id，必填
        accountType: 14418, //用户所属应用帐号类型，必填
    }
};