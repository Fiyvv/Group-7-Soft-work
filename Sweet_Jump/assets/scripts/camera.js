cc.Class({
    extends: cc.Component,
    properties: {
       
        target:{
            default:null,
            type:cc.Node
        },
        tieldMap:{
            default:null,
            type:cc.Node
        }
    },
 
    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
    },

    start () {
        var mainHeight = cc.find(UI_ROOT).height;
        var mapHeight = this.tieldMap.node.height
        this.max_y = mapHeight - mainHeight;
    },
 
    update (dt) {
        if(!this.target) return;        
        // 将节点坐标系下的一个点转换到世界空间坐标系
        var w_pos = this.target.convertToWorldSpaceAR(cc.v2(0,0));
        // 将一个点转换到节点 (局部) 空间坐标系
        var c_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        if(c_pos.y<=0 || c_pos.y>=this.max_y){
            return;
        }
        this.node.y = c_pos.y;
    },
});