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
    ctor() {
        this._score = 0
        this._label = null
    },

    start () {
        this._label = this.getComponent(cc.Label)
    },
    addScore(score) {
        this._score += score
        if (!!this._label)
            this._label.string = `得分:${this._score}`
    },
    reset() {
        this._score = 0
        if (!!this._label)
            this._label.string = "得分:0"
    }

    // update (dt) {},
});
