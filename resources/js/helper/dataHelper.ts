import {DataArray} from "./typeHelper";

export class DataHelper {

    getRandomData(size : number, isInt = true, isUnique = false, begin = Number.MIN_SAFE_INTEGER, end = Number.MAX_SAFE_INTEGER) {
        let ans : {[key: number] : number} = {};

        size = isUnique ? Math.min(size, end - begin) : size;
        let i = 0;
        while (i < size) {
            let num = this.getRandomNumber(begin, end, isInt);

            if (!isUnique || (isUnique && ans[num] == undefined)) {
                if (!isUnique)
                    ans[i] = num;
                else
                    ans[num] = num;

                i += 1;
            }
        }

        return ans;
    }

    shuffleData(arr: Array<any>) {
        let currentIndex = arr.length,  randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }

        return arr;
    }

    private getRandomNumber(begin = Number.MIN_SAFE_INTEGER, end = Number.MAX_SAFE_INTEGER, isInt = true, digit = 2) {
        return this.roundNumber(Math.random() * (end - begin + 1) + begin, isInt ? 0 : digit);
    }

    private roundNumber(num: number, digit = 0) {
        let d = Math.pow(10, digit);

        return Math.floor(num * d) / d;
    }
}
