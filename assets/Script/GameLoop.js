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
const ScorePanel = require('./ScorePanel')
const TimeCounter = require('./TimeCounterBar')

import utils from './utils'

const MAX_QUIZE_COUNT = 30
cc.Class({
    extends: cc.Component,

    properties: {
        // scoreNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._gameEngine = this.getComponent("GameEngine")
        this._gameNode = this.node.getChildByName('gameArea')
        this._itemPool = this.getComponent(ItemPool)
        this._quizzer = this.getComponent(Quizzer)
        this._quize = null
        this._hitTester = this._gameNode.getComponent(HitTester)
        this._score = null
        this._scorePanel = this.getComponentInChildren(ScorePanel)
        this._timeCounter = this.getComponentInChildren(TimeCounter)
        this._combo = 0
        this._total = MAX_QUIZE_COUNT

        let scoreNode = this._scorePanel.node
        this._scoreDestPos = this.node.convertToNodeSpace(scoreNode.convertToWorldSpace(scoreNode.getPosition()))
        this._timeCounter.setDuration(10)

        this.node.on('drag-end', this.onDragEnd, this)
        this.node.on('time-out', this.onTimeout, this)

        this._addScoreAction = cc.sequence(
            cc.scaleTo(0.2, 1.2, 1.2),
            cc.spawn(
                cc.moveTo(0.3, this._scoreDestPos),
                cc.scaleTo(0.3, 1, 1)
            ),
            cc.callFunc(this.afterAddScore, this)
        )
    },

    start () {
        // this.startLoop()
    },

    afterAddScore() {
        this._scorePanel.addScore(10)
        this._itemPool.returnAddScoreItem(this._score)
        this._total--

        if (this._total <= 0) {
            this._gameEngine.showResult()
        } else {
            this.nextLoop()
        }
    },

    startLoop() {
        //reset statistics
        this._combo = 0
        this._total = MAX_QUIZE_COUNT

        this.nextLoop()
    },
    nextLoop() {
        let quize = this._quizzer.nextRandomQuize()
        let hitTester = this._hitTester

        this._quize = quize
        
        let width = this.node.parent.width
        let height = this.node.parent.height
        console.log("w, h:", width, height)

        let drag = this._itemPool.getDraggableItem(quize.expression, hitTester)
        drag.position = cc.v2(0, 0)
        drag.parent = this._gameNode

        let len = quize.confusedAnswer.length + 1
        let pos = utils.randomInt(0, len - 1)
        let offset = 0
        for (let i = 0; i < len; i++) {
            let fixed = this._itemPool.getFixedItem(i == pos ? quize.answer : quize.confusedAnswer[i + offset])
            if (i == pos)
                offset = -1

            fixed.parent = this._gameNode
            fixed.position = cc.v2(i % 2 == 0 ? 0 - width / 4 : width / 4, i >= 2 ? height / 4 : 0 - height / 4)
        }
        this._timeCounter.reset()
    },

    onDragEnd(event) {
        console.log(event)
        let drag = event.getUserData()
        event.stopPropagation();

        if (!drag)
            return

        let hit = this._hitTester.hittedFixedItem
        let chosenAnswer = !!hit ? hit.text : null

        // 无论答案是否正确，先将选中答案项重置
        this._hitTester.hittedFixedItem = null

        if (!!this._quize) {
            if (this._quize.answer == chosenAnswer) {
                this._itemPool.returnDraggableItem(drag.node)
                let items = this._gameNode.getComponentsInChildren('FixedItem')
                
                //停止倒计时
                this._timeCounter.stopCount()

                if (!this._timeCounter.isTimeout()) {
                    this._combo++
                }

                this._score = this._itemPool.getAddScoreItem(10 + 10 * (Math.floor(this._combo / 3)))
                this._score.position = hit.node.position

                if (!!items && items.length > 0)
                    items.forEach((it) => this._itemPool.returnFixedItem(it.node))

                this._score.parent = this._gameNode
                
                this._score.runAction(this._addScoreAction)
                return
            } else {
                //TODO 答案错误
            }
        }

        drag.resetPosition()      
    },

    onTimeout(event) {
        this._combo = 0
    },

    // update (dt) {},
});
