
cc.Class({
    extends: cc.Component,

    properties: {
        jump:cc.Node
    },
 onLoad(){
    this._onButton=false;
    this.setEvent(this.jump);
    },
    setEvent(node){
        //按钮的触摸事件，触摸开始
        node.on("touchstart" , this.touchStart, this);
        //触摸结束
        node.on("touchend", this.touchEnd, this);
        node.on("touchcancel", this.touchEnd, this);
    },
touchStart(e){
    this._onButton=true;
    console.log("按着");
},


touchEnd(e){
    this._onButton=false
    console.log("非按着");
},

    // start () {
       
    // },

    // update (dt) {},
});
