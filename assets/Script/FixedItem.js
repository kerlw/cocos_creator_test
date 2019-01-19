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

    ctor() {
        this._text = ""
        this._bgNode = null
        this._realNode = null
        this._label = null
    },

    properties: {
        text: {
            type: String,
            get() {
                return this._text
            },
            set(value) {
                this._text = value
                if (!!this._label)
                    this._label.string = value
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._bgNode = this.node.getChildByName("bg") || {}
        this._realNode = this.node.getChildByName("realnode") || {}
        this._label = this._realNode.getChildByName('label').getComponent(cc.Label)
        this._label.string = this._text
    },

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
        let bgNode = this._bgNode
        let realNode = this._realNode
        if (value) {
            bgNode.opacity = 50
            realNode.opacity = 150
        } else {
            bgNode.opacity = 10
            realNode.opacity = 255
        }
    },

    // update (dt) {},
});
