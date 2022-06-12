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
export class QuickSort extends Sort {
    constructor(chart) {
        super(chart, 'quickSort');
        this.delayTime = 200;
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = this.chart.getChart().data.datasets[0].data, size = arr.length;
            yield this.quickSort(arr, 0, size - 1);
        });
    }
    quickSort(arr, low, high) {
        return __awaiter(this, void 0, void 0, function* () {
            if (low < high) {
                let pi = yield this.partition(arr, low, high);
                yield this.quickSort(arr, low, pi - 1);
                yield this.quickSort(arr, pi + 1, high);
            }
        });
    }
    partition(arr, low, high) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handle(0);
            let pivot = arr[high], i = low - 1, j;
            this.chart
                .mark(i, 'rgb(153, 128, 250)')
                .mark(low, 'rgb(27, 20, 100)')
                .mark(high, 'rgb(0, 148, 50)')
                .updateChart();
            yield this.handle();
            for (j = low; j <= high; j++) {
                yield this.handle(0);
                this.chart.mark(j, 'rgb(111, 30, 81)').updateChart();
                yield this.handle();
                if (arr[j] < pivot) {
                    i++;
                    this.chart
                        .unMark(i - 1)
                        .mark(i, 'rgb(153, 128, 250)')
                        .updateChart();
                    yield this.handle();
                    [arr[j], arr[i]] = [arr[i], arr[j]];
                }
                this.chart.unMark(j).updateChart();
                yield this.handle(0);
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            this.chart
                .mark(i + 1, 'rgb(153, 128, 250)')
                .unMark(i)
                .updateChart();
            yield this.handle();
            this.chart
                .unMark(i + 1)
                .unMark(j)
                .unMark(low)
                .unMark(high)
                .updateChart();
            yield this.handle(0);
            return i + 1;
        });
    }
}
