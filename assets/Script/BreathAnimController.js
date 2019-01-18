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
        // target: {
        //     default: null,
        //     type: cc.Node
        // },
        animOnStart: true,
        // anim: {
        //     default: null,
        //     type: cc.Animation
        // }
    },

    // LIFE-CYCLE CALLBACKS:

    start () {
        if (!this._anim) {
            console.log("Error: Cannot find/create animation component!")
            return
        }

        let self = this
        cc.loader.loadRes("breath", (err, clip) => {
            console.log("load res finished", err, clip)
            self._anim.addClip(clip, "breathAnim")
            if (self.animOnStart)
                self._anim.playAdditive("breathAnim")
        })

    },

    onLoad () {
        this._anim = this.getComponent(cc.Animation)
        console.log("    anim controller", this._anim)
        if (!this._anim) {
            this._anim = this.node.addComponent(cc.Animation)
        }
    },

    startAnim() {
        if (!!this._anim) {
            this._anim.playAdditive("breathAnim")
        }
    },

    // update (dt) {},
});
