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
        draggableItemPrefab: cc.Prefab,
        fixedItemPrefab: cc.Prefab        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dragPool = new cc.NodePool()
        this.fixedPool = new cc.NodePool()
    },

    getDraggableItem() {
        if (this.dragPool.size() > 0) {
            return this.dragPool.get()
        } else {
            return cc.instantiate(this.draggableItemPrefab)
        }
    }, 
    getFixedItem() {
        // let ret = null
        if (this.fixedPool.size() > 0) {
            return this.fixedPool.get()
        } else {
            return cc.instantiate(this.fixedItemPrefab)
        }
    },
    returnDraggableItem(item) {
        this.dragPool.put(item)
    },
    returnFixedItem(item) {
        this.fixedPool.put(item)
    }

    // update (dt) {},
});
