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
    ctor() {
        // this._dragItem = null
        this._hitItem = null
    },

    properties: {
        hittedFixedItem: {
            type: FixedItem,
            get() {
                return this._hitItem
            },
            set(item) {
                if (!!this._hitItem) {
                    this._hitItem.setHover(false)
                }
                if (!!item) {
                    item.setHover(true)
                }
        
                this._hitItem = item
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    },

    onDraggableItemMoved(item) {
        if (!item.isDragging())
            return
        // console.log("isMoving ", item.isDragging(), item.node.position)

        let array = this.node.getComponentsInChildren(FixedItem) || []
        let hit = null
        for (let ele of array) {
            if (ele.hitTest(item.node.position)) {
                hit = ele
                break
            }
        }

        this.hittedFixedItem = hit
    },
    // update (dt) {},
});
