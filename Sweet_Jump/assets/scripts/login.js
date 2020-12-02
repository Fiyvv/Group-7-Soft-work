// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        wx.getSetting({
            success(res) {
                // 已授权
                if (res.authSetting["scope.userInfo"]) {
                    // 进入下一步，比如【选择服务器】
                }
                // 显示授权按钮
                else {
                    let sysInfo = wx.getSystemInfoSync();
                    let button = wx.createUserInfoButton({
                        type: "text",
                        text: "微信登录",
                        style: {
                            left: sysInfo.windowWidth / 2 - 50,
                            top: sysInfo.windowHeight / 2 - 30,
                            width: 100,
                            height: 60,
                            backgroundColor: "#c7a976",
                            color: "#5c5941",
                            borderColor: "#5c5941",
                            textAlign: "center",
                            fontSize: 16,
                            borderWidth: 4,
                            borderRadius: 4,
                            lineHeight: 60,
                        }
                    });
                    button.onTap(function (res) {
                        if (res.userInfo) {
                            button.destroy();
                            // 进入下一步，比如【选择服务器】
                        } else {
                            wx.showModal({
                                title: "温馨提示",
                                content: "《XXX》是一款在线对战游戏，需要您的用户信息登录游戏。",
                                showCancel: false,
                            });
                        }
                    });
                    button.show();
                }
            }
        });

    },

    // update (dt) {},
});