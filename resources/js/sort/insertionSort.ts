import {BarChart} from "../helper/chartHelper";
import {Sort} from "./sort";

export class InsertionSort extends Sort {
    constructor(chart: BarChart) {
        super(chart, 'insertionSort');
        this.delayTime = 300;
    }

    async sort() {
        let arr = this.chart.getChart().data.datasets[0].data;
        await this.insertionSort(arr);
    }

    private async insertionSort(arr: Array<any>) {
        let size = arr.length;

        try {
            for (let i = 1; i < size; ++i) {
                await this.handle(0);
                let flag = arr[i],
                    j = i - 1;
                this.chart.mark(i, 'rgb(0, 148, 50)').updateChart();
                await this.handle();

                while (j >= 0 && arr[j] > flag) {
                    this.chart.mark(j, 'rgb(18, 203, 196)').updateChart();
                    await this.handle();

                    arr[j + 1] = arr[j];

                    this.chart.unMark(j);
                    await this.handle(0);

                    j--;
                }
                arr[j+1] = flag;

                this.chart.unMark(i);
                await this.handle(0);
            }
        } catch (e) {
            return;
        }
    }
}
