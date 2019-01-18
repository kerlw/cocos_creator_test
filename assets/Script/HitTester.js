// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const DraggableItem = require('./DraggableItem')
const FixedItem = require('./FixedItem')

cc.Class({
    extends: cc.Component,

    properties: {
        draggableItem: {
            default: null,
            type: DraggableItem
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (!!this.draggableItem)
            this.draggableItem.node.on('position-changed', () => this.onDraggableItemMoved())
    },

    start () {
        this._hitItem = null
    },

    onDraggableItemMoved() {
        
        if (!this.draggableItem.isDragging())
            return
        // console.log("isMoving ", this.draggableItem.isDragging(), this.draggableItem.node.position)

        let array = this.node.getComponentsInChildren(FixedItem) || []
        let hit = null
        for (let item of array) {
            if (item.hitTest(this.draggableItem.node.position)) {
                hit = item
                break
            }
        }

        this.setHittedFixedItem(hit)
    },
    setHittedFixedItem(item) {
        if (item == this._hitItem)
            return

        if (!!this._hitItem) {
            this._hitItem.setHover(false)
        }
        if (!!item) {
            item.setHover(true)
        }

        this._hitItem = item
    }
    // update (dt) {},
});
