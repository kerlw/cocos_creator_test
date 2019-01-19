// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

// const GameLoop = require('./GameLoop')
const HitTester = require('./HitTester')

cc.Class({
    extends: cc.Component,

    ctor() {
        this._hitTester = null
        this._dirty = false
        this._dragging = false
        this._draggingId = -1
    },

    properties: {
        expression: "",
        label: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('onload')
        if (!!this.expression) {
            this.label.string = this.expression
        }
        this.bindEventHandler()
    },

    start() {
        console.log("start")
    },

    resetPosition() {
        if (this._startPos)
            this.node.setPosition(this._startPos)
    },

    isDragging() {
        return this._dragging
    },

    setExpression(expr) {
        this.expression = expr
        this.label.string = expr
    },

    setHitTester(tester) {
        this._hitTester = tester
    },
    unuse() {
        console.log('unuse')
        this.unbindEventHandler()
    },
    reuse() {
        console.log('reuse')
        this.bindEventHandler()
    },
    onPositionChanged() {
        this._hitTester.onDraggableItemMoved(this)
    },
    onTouchStart(event) {
        console.log('touchstart')
        if (this._dragging)
            return

        this._draggingId = event.getID()
        this._dragging = true
        this._startPos = this.node.getPosition()
        this._touchStartX = event.getLocationX()
        this._touchStartY = event.getLocationY()
    },
    onTouchMoved(event) {
        console.log('touchmove')
        if (this._dragging && this._draggingId == event.getID()) {
            let deltaX = event.getLocationX() - this._touchStartX
            let deltaY = event.getLocationY() - this._touchStartY
            let pos = this._startPos.add(cc.v2(deltaX, deltaY))
            this.node.setPosition(pos)
        }
    },
    onTouchEnd(event) {
        console.log('touchend')
        if (this._dragging && this._draggingId == event.getID()) {
            this._dragging = false

            let event = new cc.Event.EventCustom('drag-end', true)
            event.setUserData(this)
            this.node.dispatchEvent(event)
            // let validator = this.getComponent(QuizeValidator)
            // if (!!validator && validator.checkAnswer()) {
                
            // } else {
            //     this.resetPosition()
            // }
        }
    },
    onTouchCanceled(event) {
        if (this._dragging && this._draggingId == event.getID()) {
            this._dragging = false

            this.resetPosition()
        }
    },
    bindEventHandler() {
        console.log('bindEventHandler', this.node)
        this.node.on(cc.Node.EventType.TOUCH_START/*'touchstart'*/, this.onTouchStart, this)
        this.node.on('touchmove', this.onTouchMoved, this)
        this.node.on('touchend', this.onTouchEnd, this)
        this.node.on('touchcancel', this.onTouchCanceled, this)
        this.node.on('position-changed', this.onPositionChanged, this)
    },
    unbindEventHandler() {
        this.node.off('touchstart', this.onTouchStart, this)
        this.node.off('touchmove', this.onTouchMoved, this)
        this.node.off('touchend', this.onTouchEnd, this)
        this.node.off('touchcancel', this.onTouchCanceled, this)
        this.node.off('position-changed', this.onPositionChanged, this)
    }

    // update (dt) {},
});
