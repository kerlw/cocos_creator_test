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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    hitTest(pos) {
        console.log("hittest:", pos, this.node.position)
        // let mask = this.getComponent(cc.Mask)
        let pos2 = this.node.position
        let dis = cc.v2(pos2.x - pos.x, pos2.y - pos.y).mag()
        if (dis <= this.node.width)
            return true
        return false
    },
    setHover(value) {
        value = !!value
        if (value == this._isHover)
            return
        
        this._isHover = value
        let bgNode = this.node.getChildByName("bg") || {}
        let realNode = this.node.getChildByName("realnode") || {}
        if (value) {
            bgNode.opacity = 50
            realNode.opacity = 150
        } else {
            bgNode.opacity = 10
            realNode.opacity = 255
        }
    }
    // update (dt) {},
});
