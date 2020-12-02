// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            type: cc.Node,
            default: null
        },
        bestscore: {
            type: cc.Node,
            default: null
        },
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

    },
    upload: function () {
        // console.log(this.bestscore.Top_score)
        // if (Math.ceil(this.player.position.y + 235) < this.bestscore.gettop()) {
        //     return
        // }
        console.log("upload")
        console.log(Math.ceil(this.player.position.y + 235))

        wx.cloud.init({
            env: "sweet-jump-1gqjk1fd388a8ee2"
        })
        const db = wx.cloud.database()
        wx.cloud.callFunction({
            name: 'login',
            success: res => {

                wx.cloud.callFunction({
                    name: "updatescore",
                    data: {
                        score: Math.ceil(this.player.position.y + 235)
                    },
                    success: function (res) {
                        console.log(res)
                    },
                    fail: console.error
                })
            }
        })
    }

    // update (dt) {},
});