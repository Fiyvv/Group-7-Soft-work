
cc.Class({
    extends: cc.Component,

    properties: {
       pic:{
           type:cc.Node,
           default:null
       },
       button:{
           type:cc.Node,
           default:null
       },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.active=false
    },
    show_pic()
    {
        this.node.active=true
    },
    hid_pic()
    {
        this.node.active=false
    },
     update (dt) {},
});
