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

    onLoad () {
        this.resultLabel = this.node.getChildByName('result')
    },

    init(gameEngine, statistics) {
        this._gameEngine = gameEngine

        let score = statistics.score
        let tm = this.formatTime(statistics.used_tm)
        let max = statistics.max_combo
        let accuracy = ((statistics.total - statistics.err) / statistics.total * 100).toFixed(2)
        let str = `${score}\n${tm}\n${max}\n${accuracy}%`
        this.resultLabel.getComponent(cc.Label).string = str

        let btn = this.getComponentInChildren(cc.Button)
        btn.node.on('click', () => {
            this._gameEngine.startNewGame()
        })
    },
    start () {
    },

    // update (dt) {},
    formatTime(tm) {
        let h = Math.floor(tm / 3600000)
        let m = Math.floor((tm % 3600000) / 60)
        let s = Math.floor(tm / 1000) % 60
        if (tm >= 3600 * 1000) {
            return h + "时" + m + "分" + s + "秒"
        } else if (tm > 60 * 1000) {
            return m + "分" + s + "秒"
        } else {
            return s + "秒"
        }
    },
});
