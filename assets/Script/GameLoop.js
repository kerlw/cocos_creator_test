// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const Quizzer = require('./Quizzer')
const ItemPool = require('./ItemPool')
const HitTester = require('./HitTester')
import utils from './utils'

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._quizzer = this.getComponent(Quizzer)
        this._itemPool = this.getComponent(ItemPool)
        this._gameNode = this.node.getChildByName('gameArea')
    },

    start () {
        this.startLoop()
    },


    startLoop() {
        let quize = this._quizzer.nextRandomQuize()
        
        let width = this.node.parent.width
        let height = this.node.parent.height
        console.log("w, h:", width, height)

        let drag = this._itemPool.getDraggableItem()
        drag.position = cc.v2(0, 0)
        drag.expression = quize.expression
        drag.parent = this._gameNode
        this._gameNode.getComponent(HitTester).draggableItem = drag

        let len = quize.confusedAnswer.length + 1
        let pos = utils.randomInt(0, len)
        let offset = 0
        for (let i = 0; i < len; i++) {
            let fixed = this._itemPool.getFixedItem()
            fixed.text = i == pos ? quize.answer : quize.confusedAnswer[i + offset]
            if (i == pos)
                offset = -1

            fixed.parent = this._gameNode
            fixed.position = cc.v2(i % 2 == 0 ? 0 - width / 4 : width / 4, i >= 2 ? height / 4 : 0 - height / 4)
        }
    },

    onDragEnd(draggingItem) {
        if (!draggingItem)
            return
        
        
    }

    // update (dt) {},
});
