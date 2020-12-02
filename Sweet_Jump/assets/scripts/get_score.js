// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Top_score = 0

cc.Class({
    extends: cc.Component,
    Top_score: 0,
    properties: {

        best_score: {
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
        wx.cloud.init({
            env: "sweet-jump-1gqjk1fd388a8ee2"
        })
        const db = wx.cloud.database()
        wx.cloud.callFunction({
            name: 'login',
            success: res => {
                var openid = res.result.openid
                console.log(openid)
                console.log(res)
                db.collection('users').where({
                    _openid: openid,
                }).get({
                    success: res => {
                        var user_data = res.data
                        Top_score = user_data[0].score
                        this.Top_score = Top_score
                        // console.log(user_data)
                        this.best_score.getComponent(cc.Label).string = "最好成绩：" + Top_score
                    }
                })

            }
        })
    },
    getdata: function () {
        wx.cloud.init({
            env: "sweet-jump-1gqjk1fd388a8ee2"
        })
        const db = wx.cloud.database()
        wx.cloud.callFunction({
            name: 'login',
            success: res => {
                var openid = res.result.openid
                console.log(openid)
                console.log(res)
                db.collection('users').where({
                    _openid: openid,
                }).get({
                    success: res => {
                        var user_data = res.data
                        Top_score = user_data[0].score
                        this.Top_score = Top_score
                        this.best_score.getComponent(cc.Label).string = "最新成绩：" + Top_score
                    }
                })

            }
        })
    },
    gettop: function () {
        return Top_score
    }
    // update (dt) {},
});