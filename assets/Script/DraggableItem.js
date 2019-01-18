// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const GameLoop = require('./GameLoop')

cc.Class({
    extends: cc.Component,

    properties: {
        expression: "",
        label: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._dirty = false
        this._dragging = false
        this._draggingId = -1
        if (!!this.expression) {
            this.label.string = this.expression
        }

        this.node.on('touchstart', event => {
            if (this._dragging)
                return

            this._draggingId = event.getID()
            this._dragging = true
            this._startPos = this.node.getPosition()
            this._touchStartX = event.getLocationX()
            this._touchStartY = event.getLocationY()
        })

        this.node.on('touchmove', event => {
            if (this._dragging && this._draggingId == event.getID()) {
                let deltaX = event.getLocationX() - this._touchStartX
                let deltaY = event.getLocationY() - this._touchStartY
                let pos = this._startPos.add(cc.v2(deltaX, deltaY))
                this.node.setPosition(pos)
            }
        })

        this.node.on('touchend', event => {
            if (this._dragging && this._draggingId == event.getID()) {
                this._dragging = false

                let looper = this.getComponent(GameLoopp)
                looper.onDragEnd(this)
                // let validator = this.getComponent(QuizeValidator)
                // if (!!validator && validator.checkAnswer()) {
                    
                // } else {
                //     this.resetPosition()
                // }
            }
        })

        this.node.on('touchcancel', event => {
            if (this._dragging && this._draggingId == event.getID()) {
                this._dragging = false

                this.resetPosition()
            }
        })
    },

    start() {

    },

    resetPosition() {
        if (this._startPos)
            this.node.setPosition(this._startPos)
    },

    isDragging() {
        return this._dragging
    }

    // update (dt) {},
});
