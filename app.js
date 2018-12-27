
App({
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        user: [
            {
                identifier:"user_a",
                label:"用户A",
                userSig:"eJxNzFFPgzAUhuH-0luMaQ9rUJNdEDKYCNPpsk1umqaU2YAUS2dA43*3IRh3*z7nO99ol71ccyH0ubXMjp1EdwijqymrUrZWVUoaF8*9NIzPwrtOlYxb5pvyYtCXNZvINbLAGPsBBjqjHDplJOOVnf4RSim4k1k-pemVbh0AJpSAj-E-WvUup4lPsU9uFn8ve3VyOV9to-tYp8fIyxuxh6HIRJKRdR3Ve2iGbXBsErl*FaFHszSF51CFgZHJWAe7fGX1SMYW4q*Pp*pxA7fVwdNgi1OxeXjDeVyEyyX6*QVcz1cv"
            },
            {
                identifier:"user_b",
                label:"用户B",
                userSig:"eJxNzVtPwyAYgOH-wq1GoYhT71rcmsauCVuNqTEhPbCNSDsE2h3M-rukqdHb9-kO3yBP1zdlXe-7znF30gI8AQiuxywb0Tm5kcL42FtheDVJqbVseOk4Ns2-Bdt88pF8Q3cQQjyDAZlQHLU0gpcbN95DhJDAj0w6CGPlvvMQQERQgCH8QydbMa5gAjF6mKHff3Lr83Je0ITR*HwytWy3qWPv4TKKc8s*bpNyeAvzIlOF*XKMVkjGeasPyS58uVfPUdgbq9rVUdnXA72KHlcZna932QLjHlZ6YCpdpNEZXH4AMZRZnw__"
            }
        ],
        fromUser: null, //自己
        toUser: null    //对方
    }
});