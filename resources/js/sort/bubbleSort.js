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
export class BubbleSort extends Sort {
    constructor(chart) {
        super(chart, 'bubbleSort');
        this.delayTime = 200;
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = this.chart.getChart().data.datasets[0].data;
            yield this.bubbleSort(arr);
        });
    }
    bubbleSort(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            let size = arr.length;
            try {
                for (let i = 0; i < size - 1; ++i) {
                    yield this.handle(0);
                    this.chart.mark(i, 'rgb(155, 89, 182)').updateChart();
                    for (let j = 0; j < size - i - 1; ++j) {
                        yield this.handle(0);
                        this.chart
                            .mark(j, 'rgb(46, 204, 113)')
                            .mark(j + 1, 'rgb(241, 196, 15)')
                            .updateChart();
                        yield this.handle();
                        if (arr[j] > arr[j + 1]) {
                            this.chart
                                .mark(j, 'rgb(241, 196, 15)')
                                .mark(j + 1, 'rgb(46, 204, 113)')
                                .updateChart();
                            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                            yield this.handle();
                        }
                        this.chart
                            .unMark(j)
                            .unMark(j + 1)
                            .updateChart();
                        if (j == i)
                            this.chart.mark(i, 'rgb(155, 89, 182)').updateChart();
                        yield this.handle();
                    }
                    this.chart.unMark(i).updateChart();
                    yield this.handle();
                }
            }
            catch (e) {
                return;
            }
        });
    }
}
