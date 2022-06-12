var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BarChart } from "../helper/chartHelper";
import { Sort } from "./sort";
export class MergeSort extends Sort {
    constructor(chart) {
        super(chart, 'mergeSort');
        this.delayTime = 600;
        this.initMergeChart();
    }
    initMergeChart() {
        let left = document.getElementById('chart-left'), right = document.getElementById('chart-right');
        this.chartLeft = new BarChart(left);
        this.chartRight = new BarChart(right);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = this.chart.getChart().data.datasets[0].data, size = arr.length;
            yield this.mergeSort(0, size - 1, arr);
        });
    }
    end() {
        super.end();
        this.chartLeft
            .reset()
            .updateChartData({})
            .updateChart();
        this.chartRight
            .reset()
            .updateChartData({})
            .updateChart();
        return this;
    }
    mergeSort(begin, end, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (begin >= end)
                return;
            let mid = begin + Math.floor((end - begin) / 2);
            yield this.mergeSort(begin, mid, arr);
            yield this.mergeSort(mid + 1, end, arr);
            yield this.merge(begin, mid, end, arr);
        });
    }
    merge(begin, mid, end, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.handle(0);
                let lLeft = mid - begin + 1, lRight = end - mid;
                let left = [], right = [], chartL = {}, chartR = {};
                for (let i = begin; i <= mid; ++i) {
                    left.push(arr[i]);
                    chartL[i] = arr[i];
                    this.chartLeft.updateChartData(chartL);
                }
                for (let i = mid + 1; i <= end; ++i) {
                    right.push(arr[i]);
                    chartR[i] = arr[i];
                    this.chartRight.updateChartData(chartR);
                }
                let iL = 0, iR = 0, index = begin;
                while (iL < lLeft && iR < lRight) {
                    this.chart
                        .mark(index, 'rgb(46, 204, 113)')
                        .updateChart();
                    this.chartLeft
                        .mark(iL, 'rgb(155, 89, 182)')
                        .updateChart();
                    this.chartRight
                        .mark(iR, 'rgb(52, 152, 219)')
                        .updateChart();
                    yield this.handle();
                    if (left[iL] < right[iR]) {
                        arr[index] = left[iL];
                        this.chartLeft
                            .unMark(iL)
                            .updateChart();
                        iL++;
                    }
                    else {
                        arr[index] = right[iR];
                        this.chartRight
                            .unMark(iR)
                            .updateChart();
                        iR++;
                    }
                    this.chart
                        .unMark(index)
                        .updateChart();
                    index++;
                }
                while (iL < lLeft) {
                    this.chart
                        .mark(index, 'rgb(46, 204, 113)')
                        .updateChart();
                    this.chartLeft
                        .mark(iL, 'rgb(155, 89, 182)')
                        .updateChart();
                    yield this.handle();
                    arr[index] = left[iL];
                    this.chart
                        .unMark(index)
                        .updateChart();
                    this.chartLeft
                        .unMark(iL)
                        .updateChart();
                    iL++;
                    index++;
                }
                while (iR < lRight) {
                    this.chart
                        .mark(index, 'rgb(46, 204, 113)')
                        .updateChart();
                    this.chartRight
                        .mark(iR, 'rgb(52, 152, 219)')
                        .updateChart();
                    arr[index] = right[iR];
                    yield this.handle();
                    this.chart
                        .unMark(index)
                        .updateChart();
                    this.chartRight
                        .unMark(iR)
                        .updateChart();
                    iR++;
                    index++;
                }
                yield this.handle(0);
            }
            catch (e) {
                return;
            }
        });
    }
}
