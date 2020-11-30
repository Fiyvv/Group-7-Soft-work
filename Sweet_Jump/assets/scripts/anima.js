cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {

        // this.playerState = State.stand;
        this.anima = 'idle';
        this.playerAni = this.node.getComponent(cc.Animation);

    },

    setAni(anima) {
        if(this.anima == anima)
            return;
        
        this.anima = anima;
        this.playerAni.play(anima);
        
    },
    update (dt) {
        let anima = this.anima;
       //console.log(this.node.getComponent(cc.RigidBody).linearVelocity.x)
        if(this.node.getComponent(cc.RigidBody).linearVelocity.y)
            anima = 'jump';
        else if(this.node.getComponent(cc.RigidBody).linearVelocity.x)
            anima = 'run';
        else
            anima = 'idle';

        if(anima){
            this.setAni(anima);
        }
    },
});
