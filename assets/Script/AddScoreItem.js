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
        this._score = 0
        this._label = null
    },
    properties: {
        score: {
            type: cc.Integer,
            get() { return this._score  },
            set(value) {
                this._score = value
                if (!!this._label)
                    this._label.string = `+${value}`
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._label = this.node.getChildByName('label').getComponent(cc.Label)
        this._label.string = this._score + ""
    },
    unuse() {

    },
    reuse() {

    }

    // update (dt) {},
});
