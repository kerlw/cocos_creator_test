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
        this._resultBoard = null  
    },

    properties: {
        resultBoardPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._gameLoop = this.getComponent("GameLoop")
    },

    start () {
        this.startNewGame()
    },
    startNewGame() {
        if (!!this._resultBoard) {
            this._resultBoard.removeFromParent()
            this._resultBoard = null
        }
        this._gameLoop.startLoop()
    },
    showResult() {
        this._resultBoard = cc.instantiate(this.resultBoardPrefab)
        this._resultBoard.getComponent('ResultBoard').init(this)
        this._resultBoard.parent = this.node
    },

    // update (dt) {},
});
