// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import utils from './utils'

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    nextRandomQuize() {
        let x = utils.randomInt(2, 9)
        let y = utils.randomInt(x, 9)
        let mask = utils.randomInt(0, 2)
        let answer = mask == 0 ? x : (mask == 1 ? y : x * y)

        return {
            expression: `${mask == 0 ? '?' : x} x ${mask == 1 ? '?' : y} = ${mask == 2 ? '?' : x*y}`,
            answer: answer + "",
            confusedAnswer: [answer + 1, answer - 1, answer + 10]
        }
    },

    checkAnswer() {
        return false
    }

    // update (dt) {},
});
