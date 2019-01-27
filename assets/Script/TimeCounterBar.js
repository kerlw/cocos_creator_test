// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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

    ctor() {
        this._duration = 1
        this._timer = 0
        this._inuse = false
        this._timeout = false
    },
    onLoad () {
        this._progressBar = this.getComponent(cc.ProgressBar)
    },

    start () {
    },
    setDuration(sec) {
        this._duration = sec
    },
    reset() {
        this._timer = 0
        this._inuse = true
        this._timeout = false
    },
    stopCount() {
        this._inuse = false
    },
    isTimeout() {
        return this._timeout
    },
    update (dt) {
        if (this._inuse) {
            this._timer += dt
            if (this._timer >= this._duration) {
                this._timeout = true
                this._timer = this._duration
                this.node.dispatchEvent(new cc.Event.EventCustom('time-out', true))
                this._inuse = false
            }
            this._progressBar.progress = this._timer / this._duration
        }
    },
});
