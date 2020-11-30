
/**
 *Front
 *
 * @enum {number}
 */
enum Front {
  left,
  right,
  up,
  down
}
/**
 *给定极角，极径获取点
 *
 * @export
 * @param {*} rad
 * @param {*} radius
 * @returns
 */
let getPos = (rad: number, radius: number): cc.Vec2 =>//获得极径
  cc.v2(radius * Math.cos(rad), radius * Math.sin(rad))//radius半径，rad角度
/**
 *判断点是否在node上
 *
 * @private
 * @memberof MoveFront
 */
let hasPos = (node: cc.Node, pos: cc.Vec2): boolean =>
  node.getBoundingBox().contains(node.getParent().convertToNodeSpaceAR(pos))//

/*
*getBoundingBox   返回父节坐标系下的轴向对齐的包围盒。
*contains  是否包含指定节点
*getParent 获取该节点的父节点。
*convertToNodeSpaceAR 将一个点转换到节点 (局部) 空间坐标系。
*/




/**
 * convertToWorldSpaceAR
 * @param node
 */
let toWPos = (node: cc.Node) =>//获取这个节点的世界坐标?
  node.getParent().convertToWorldSpaceAR(node.position)
/**
 * convertToNodeSpaceAR
 * @param node
 */
let toLPos = (node: cc.Node, pos: cc.Vec2): cc.Vec2 =>//获取这个节点的当前参考系坐标?
  node.getParent().convertToNodeSpaceAR(pos)
/**
 *follow
 * @param follower
 * @param target
 */
let follow = (follower: cc.Node, target: cc.Node) => {
  follower.setPosition(toLPos(follower, toWPos(target)))//设置节点在父节点坐标的位置
  // console.log("test")
}
/**
 *MoveFront
 *
 * @class MoveFront
 */
class MoveFront {
  private leftBtn: cc.Node
  private rightBtn: cc.Node
  private upBtn: cc.Node
  private targetBody: cc.RigidBody
  private isHold: Boolean
  private isOnGround: boolean
  private front: Front
  private landImpulse: number
  private portImpulse: number

  public firsttime: number
  public secondtime: number
  public ctime: number
  public face_dir: number
  public add_time: number = 0
  public X: number
  public Y: number

  
  constructor(//初始化
    leftBtn: cc.Node,
    rightBtn: cc.Node,
    upBtn: cc.Node,
    hero: cc.Node,
    progress:cc.ProgressBar,
    landImpulse: number,
    portImpulse: number,
    scroe: cc.Node,
  ) {
    this.leftBtn = leftBtn
    this.rightBtn = rightBtn
    this.upBtn = upBtn
    this.initPhysicsBody(hero, landImpulse, portImpulse)//物理引擎初始化
    this.initContact()
    return this
  }


  public addtime() {
    this.add_time += 1
  }



  /**
   *listen
   *
   * @memberof MoveFront
   */
  public listen() {
    this.addTouchListener(this.leftBtn, () => {
      this.front = Front.left
    })
    this.addTouchListener(this.rightBtn, () => {
      this.front = Front.right
    })
    this.addTouchListener(this.upBtn, () => {
      this.front = Front.up
    })
    this.addKeyListener()
  }
  /**
   *initPhysicsBody
   *
   * @private
   * @param {cc.Node} target
   * @param {number} landImpulse
   * @param {number} portImpulse
   * @memberof MoveCtrllor
   */
  private initPhysicsBody(
    target: cc.Node,
    landImpulse: number,//地面冲量?
    portImpulse: number//飞天冲量?
  ) {
    this.targetBody = target.getComponent(cc.RigidBody)
    this.landImpulse = 100
    this.portImpulse = 100
  }
  /**
   *angle
   *
   * @private
   * @param {number} angle
   * @memberof MoveFront
   */
  private apply(impulse: cc.Vec2) {//设置冲量？
    this.targetBody.applyLinearImpulse(//施加冲量到刚体上的一个点，将立即改变刚体的线性速度。
      impulse,
      this.targetBody.getWorldCenter(),//刚体世界坐标系的质心
      true
    )
  }

  private updateIsOnGround(): void {
    this.isOnGround = Math.abs(this.targetBody.linearVelocity.y) < 1e-10;
  }

  /**
   *step
   *
   * @memberof MoveFront
   */
  public step() {//this.isHold按键被按下
    if (this.isHold) {
      this.updateIsOnGround();
      switch (this.front) {
        case Front.left:
          this.isOnGround ? this.mov_left() : null//左边，就是180（PI）度方向
          break
        case Front.right:
          this.isOnGround ? this.mov_right() : null//右边，就是0度方向
          break
        case Front.up:
          this.isOnGround ? this.addtime() : null//判断是否是在空中，在空中，则null，否则则向上
          break
      }
    }
  }
  /**
   *jump
   *
   * @private
   * @memberof MoveCtrllor
   */

  public mov_left() {
    this.apply(getPos(Math.PI, 40))
    this.face_dir = 1;
  }
  public mov_right() {
    this.apply(getPos(0, 40))
    this.face_dir = -1;
  }
  private jump() {//跳跃函数
     
      if (this.add_time  > 87) {
        this.add_time = 87;
      }
      if (this.add_time < 30) {
        this.add_time = 30;
      }
      this.apply(getPos(Math.PI / 2, this.add_time * 30))
      this.apply(getPos(Math.PI, this.face_dir * 850))
    
  }
  private getfirsttime() {
    this.firsttime = this.add_time;
  }
  private getendtime() {
    this.secondtime = this.add_time;
    this.portImpulse = 100 * (this.secondtime - this.firsttime);
    // alert("success2")
    this.jump()
  }

  /**
   *initContact
   *
   * @private
   * @memberof MoveCtrllor
   */
  private initContact() {//初始化联系
    // this.targetBody.onBeginContact = () => {//设置默认在地面
    //   this.isOnGround = true
    //   // this.face_dir=-1
    // }
    this.apply(getPos(-Math.PI / 2, this.portImpulse))//设置天空冲量为0?
  }






  // public getNowDate(): number {
  //   const date = new Date();
  //   let seconds: string | number = date.getSeconds();
  //   let milliseconds: string | number = date.getMilliseconds();


  //   return seconds*1000+milliseconds;
  // }

  /**
   *addTouchListener
   *
   * @private
   * @param {cc.Node} node
   * @memberof MoveFront
   */
  private addTouchListener(node: cc.Node, callback?: Function) {
    node.on(cc.Node.EventType.TOUCH_START, () => {//按下按钮开始
      // new Date();
      // this.date=Date.prototype.getDate()
      this.getfirsttime()
      this.isHold = true//按钮被按下
      !!callback ? callback() : null
    })
    // node.on(cc.Node.EventType.TOUCH_MOVE, event => {//按下按钮移动
    //   this.isHold = hasPos(node, event.getLocation())//前一个按钮是否按下?????
    // })
    node.on(cc.Node.EventType.TOUCH_END, () => {//按下按钮结束
      //  this.secondtime=this.add_time
      // console.log(this.ctime)
      if (this.isHold) {
        switch (this.front) {
          case Front.up:
            this.isOnGround ? this.jump() : null//判断是否是在空中，在空中，则null，否则则向上
            this.add_time = 0
            break
        }
      }
      this.isHold = false//按钮不被按下
    })
    // node.on(cc.Node.EventType.TOUCH_CANCEL, () => {//按下按钮取消
    //   this.isHold = false
    // })

    // this.ctime=this.secondtime-this.firsttime
    // return this.ctime
  }
  /**
   *addKeyListener
   *
   * @private
   * @param {cc.Node} node
   * @memberof MoveFront
   */
  private addKeyListener() {//按键监听设置
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
      this.isHold = true
      switch (event.keyCode) {
        case cc.macro.KEY.a:
        case cc.macro.KEY.left:
          this.front = Front.left
          break
        case cc.macro.KEY.d:
        case cc.macro.KEY.right:
          this.front = Front.right
          break
        case cc.macro.KEY.w:
        case cc.macro.KEY.up:
          this.front = Front.up
          break
      }
    })
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, event => {
      this.isHold = false
    })
  }
}
const { ccclass, property } = cc._decorator
const OPTIONS = cc.Enum({
  NO: 0,
  YES: 1
})
/**
 *Move
 *
 * @export
 * @class Move
 * @extends {cc.Component}
 */

@ccclass
export default class Move extends cc.Component {
  @property(cc.Node)//方法变成属性
  leftBtn: cc.Node = null
  @property(cc.Node)
  rightBtn: cc.Node = null
  @property(cc.Node)
  upBtn: cc.Node = null
  @property(cc.Node)
  hero: cc.Node = null
  @property(cc.Node)
  score: cc.Node = null
  @property(cc.ProgressBar)
  pprogress: cc.ProgressBar = null

  @property({
    type: cc.Integer,//字符串为整数
    displayName: '水平冲量模'
  })
  landImpulse: number = 1000

  @property({
    type: cc.Integer,
    displayName: '垂直冲量模'
  })
  portImpulse: number = 30000

  @property({
    type: cc.Enum(OPTIONS),
    displayName: '是否开启摄像机跟随'
  })
  cameraActive = OPTIONS.NO

  MoveFront: MoveFront

  camera: cc.Node

  onLoad() {
    cc.director.getPhysicsManager().enabled = true//物理管理器（物理引擎？？？）设为真
    this.MoveFront = new MoveFront(
      this.leftBtn,
      this.rightBtn,
      this.upBtn,
      this.hero,
      this.landImpulse,
      this.portImpulse,
      this.score,
      this.pprogress
    )

    this.camera = cc.Canvas.instance.node.getComponentInChildren(cc.Camera).node


  }





  start() {
    this.MoveFront.listen()//对按钮进行监听
  }

  update() {
    if(this.MoveFront.face_dir==1)
    {
      this.hero.scaleX=-1
    }
    else
    this.hero.scaleX=1
    // this.MoveFront.addtime()
    this.MoveFront.step()//更新函数对按钮进行更新
    // console.log(this.date)
    this.cameraActive ? follow(this.camera, this.hero) : null
    // console.log(this.hero.position.y)
    this.MoveFront.Y=Math.ceil(this.hero.position.y+235)
    // console.log( this.MoveFront.Y)
    this.score.getComponent(cc.Label).string= this.MoveFront.Y.toString()
    if(this.MoveFront.add_time<=30)
    {
      this.pprogress.node.opacity=0;
    }
    if(this.MoveFront.add_time>30)
    {
      this.pprogress.node.opacity=255;
    }
    // console.log(this.MoveFront.add_time)
    if (this.MoveFront.add_time  > 87) {
      this.MoveFront.add_time = 87;
    }
    if (this.MoveFront.add_time < 30) {
      this.MoveFront.add_time = 30;
    }
    this.pprogress.progress=(this.MoveFront.add_time-30)/100
  }
}
