var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sort } from "./sort";
export class InsertionSort extends Sort {
    constructor(chart) {
        super(chart, 'insertionSort');
        this.delayTime = 300;
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = this.chart.getChart().data.datasets[0].data;
            yield this.insertionSort(arr);
        });
    }
    insertionSort(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            let size = arr.length;
            try {
                for (let i = 1; i < size; ++i) {
                    yield this.handle(0);
                    let flag = arr[i], j = i - 1;
                    this.chart.mark(i, 'rgb(0, 148, 50)').updateChart();
                    yield this.handle();
                    while (j >= 0 && arr[j] > flag) {
                        this.chart.mark(j, 'rgb(18, 203, 196)').updateChart();
                        yield this.handle();
                        arr[j + 1] = arr[j];
                        this.chart.unMark(j);
                        yield this.handle(0);
                        j--;
                    }
                    arr[j + 1] = flag;
                    this.chart.unMark(i);
                    yield this.handle(0);
                }
            }
            catch (e) {
                return;
            }
        });
    }
}
