module.exports = {
    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    //随机整数，大概率落在指定范围的中盘
    randomInt2: (min, max) => {
        return Math.floor((1 - Math.pow((Math.random() * 2 - 1), 3)) / 2 * (max - min + 1)) + min
    }
}