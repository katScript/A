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
export class SelectionSort extends Sort {
    constructor(chart) {
        super(chart, 'selectionSort');
        this.delayTime = 200;
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = this.chart.getChart().data.datasets[0].data;
            yield this.selectionSort(arr);
        });
    }
    selectionSort(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            let size = arr.length;
            try {
                for (let i = 0; i < size; ++i) {
                    yield this.handle(0);
                    let min_idx = i;
                    this.chart.mark(i, 'rgb(46, 204, 113)').updateChart();
                    for (let j = i + 1; j < size; ++j) {
                        this.chart.mark(j, 'rgb(52, 73, 94)').updateChart();
                        yield this.handle();
                        if (arr[j] < arr[min_idx]) {
                            min_idx = j;
                        }
                        this.chart
                            .unMark(j)
                            .updateChart();
                    }
                    this.chart.mark(min_idx, 'rgb(46, 204, 113)').updateChart();
                    yield this.handle();
                    let b = arr[min_idx];
                    arr[min_idx] = arr[i];
                    arr[i] = b;
                    this.chart
                        .unMark(i)
                        .unMark(min_idx)
                        .updateChart();
                    yield this.handle(0);
                }
            }
            catch (e) {
                return;
            }
        });
    }
}
