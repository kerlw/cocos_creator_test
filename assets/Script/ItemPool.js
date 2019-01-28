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
        fixedItemPrefab: cc.Prefab,
        addScoreItemPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dragPool = new cc.NodePool()
        this.fixedPool = new cc.NodePool()
        this.scorePool = new cc.NodePool()
    },

    getDraggableItem(expression, hitTester) {
        let ret = null
        if (this.dragPool.size() > 0) {
            ret = this.dragPool.get()
        } else {
            ret = cc.instantiate(this.draggableItemPrefab)
        }

        let item = ret.getComponent('DraggableItem')
        item.setExpression(expression)
        item.setHitTester(hitTester)

        console.log('get called')
        return ret
    }, 
    getFixedItem(itemText) {
        let ret = null
        if (this.fixedPool.size() > 0) {
            ret = this.fixedPool.get()
        } else {
            ret = cc.instantiate(this.fixedItemPrefab)
        }

        let item = ret.getComponent('FixedItem')
        item.text = itemText
        return ret
    },
    getAddScoreItem(score) {
        let ret = null
        if (this.scorePool.size() > 0) {
            ret = this.scorePool.get()
        } else {
            ret = cc.instantiate(this.addScoreItemPrefab)
        }
        ret.getComponent('AddScoreItem').score = score
        // ret.score = score
        return ret
    },
    returnDraggableItem(item) {
        this.dragPool.put(item)
    },
    returnFixedItem(item) {
        this.fixedPool.put(item)
    },
    returnAddScoreItem(item) {
        this.scorePool.put(item)
    }

    // update (dt) {},
});
