interface Condition {
    odd?: boolean
    min?: number
    max?: number
    value?: string
}


class HousesParser {

    private conditions: Condition[]

    constructor(private readonly source: string) {
        console.log("HousesParser", source)
        let rawConditionsArray = source.match(/((не)?четные\s+\d+-\d+)|((не)?четные\s+\d+\+)|(\d+-\d+)|((не)?четные\s+с\s+\d+)|(\d+((\/\d+)|([а-я]))?)/ig)
        this.conditions = []
        for (let rawCond of rawConditionsArray) {
            if (/(не)?четные\s+\d+-\d+/i.test(rawCond)) {
                let [min, max] = HousesParser.getNumbers(rawCond)
                if (min > max) {
                    throw new Error(`Неверные входные данные`)
                }
                let odd = HousesParser.isOdd(rawCond)
                this.conditions.push({ odd, min, max })
                continue
            }
            if (/(не)?четные\s+\d+\+/i.test(rawCond)) {
                let [min] = HousesParser.getNumbers(rawCond)
                let odd = HousesParser.isOdd(rawCond)
                this.conditions.push({ odd, min })
                continue
            }
            if (/(не)?четные\s+с\s+\d+/i.test(rawCond)) {
                let [min] = HousesParser.getNumbers(rawCond)
                let odd = HousesParser.isOdd(rawCond)
                this.conditions.push({ odd, min })
                continue
            }
            if (/\d+-\d+/i.test(rawCond)) {
                let [min, max] = HousesParser.getNumbers(rawCond)
                if (min > max) {
                    throw new Error(`Неверные входные данные`)
                }
                this.conditions.push({ min, max })
                continue
            }
            if (/\d+((\/\d+)|([а-я]))?/i.test(rawCond)) {
                this.conditions.push({ value: rawCond })
                continue
            }
        }
        console.log(this.conditions)
    }

    private static getNumbers(str: string): number[] {
        return str.match(/\d+/ig).map(e => parseInt(e))
    }

    private static isOdd(str: string): boolean {
        if (/нечетные/ig.test(str)) {
            return true
        }
        if (/четные/ig.test(str)) {
            return false
        }
        throw new Error(`Неверные входные данные`)
    }

    isHouseIncluded(address: string): boolean {
        console.log("isHouseIncluded", address)
        let num = parseInt(address)
        if (Number.isNaN(num)) {
            return false
        }
        for (let cond of this.conditions) {
            if ("value" in cond) {
                if (address === cond.value) {
                    return true
                }
                continue
            }
            if (cond.odd === true && num % 2 === 0) {
                continue
            }
            if (cond.odd === false && num % 2 === 1) {
                continue
            }
            if ("min" in cond && cond["min"] > num) {
                continue
            }
            if ("max" in cond && cond["max"] < num) {
                continue
            }
            return true
        }
        return false
    }
}


let hp = new HousesParser("четные  2-28, нечетные 1-21");
console.log(hp.isHouseIncluded("56"))
console.log(hp.isHouseIncluded("77"))
console.log(hp.isHouseIncluded("3а"))

hp = new HousesParser("нечетные 11+, четные 42+");
console.log(hp.isHouseIncluded("3"))
console.log(hp.isHouseIncluded("766"))
console.log(hp.isHouseIncluded("17"))


hp = new HousesParser("четные с 20 и вся улица до конца");
console.log(hp.isHouseIncluded("20"))
console.log(hp.isHouseIncluded("12"))

hp = new HousesParser("7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а");
console.log(hp.isHouseIncluded("77"))
console.log(hp.isHouseIncluded("3"))
console.log(hp.isHouseIncluded("17/1"))
console.log(hp.isHouseIncluded("15а"))
console.log(hp.isHouseIncluded("15и"))

hp = new HousesParser("12, 22, 36, 42, 45, 100-106");
console.log(hp.isHouseIncluded("77"))
console.log(hp.isHouseIncluded("36"))
console.log(hp.isHouseIncluded("22"))
console.log(hp.isHouseIncluded("101"))
