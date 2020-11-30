
 class T1 {
    private num1:number=0
    private first_m:number=0
    private  first_s:number=0
    public bmp_font:cc.Node
    constructor(//初始化
        num1:number,
        first_m:number,
        first_s:number,
        bmp_font:cc.Node,
    ) {
        this.num1=num1
        this.first_m=first_m
        this.first_s=first_s
        this.bmp_font=bmp_font
       
        return this
    }

     public first(){
        var da=new Date();
        this.first_m=da.getMinutes();
        this.first_s=da.getSeconds();
    }
      public sayTime(){
        this.num1=0;
        var date=new Date();
        var now_m=date.getMinutes();
        var now_s=date.getSeconds();
        if(now_m<this.first_m){
            this.num1=this.num1+(60-this.first_m+now_m)*60;
        }
        else{
            this.num1=this.num1+(now_m-this.first_m)*60;
        }
        this.num1=this.num1-this.first_s+now_s;
        this.bmp_font.getComponent(cc.Label).string=this.num1.toString()
    }
}

//////////////////////////
/**
 *Time1
 *
 * @export
 * @class Time1
 * @extends {cc.Component}
 */
const { ccclass, property } = cc._decorator
@ccclass
export default class t2 extends cc.Component {
    @property(cc.Integer)
    private num1:number=0
    @property(cc.Integer)
    private first_m:number=0
    @property(cc.Integer)
    private  first_s:number=0
    @property(cc.Node)
    public bmp_font:cc.Node=null
    T1:T1
    onLoad() {
        // console.log("onload")
        this.T1=new T1(this.num1,
            this.first_m,
            this.first_s,
            this.bmp_font)
       this.T1.first()
      }

      update() {
        this.T1.sayTime()
    
    }
    
}