import {BarChart} from "../helper/chartHelper";
import {Sort} from "./sort";

export class BubbleSort extends Sort {
    constructor(chart: BarChart) {
        super(chart, 'bubbleSort');
        this.delayTime = 200;
    }

    async sort() {
        let arr = this.chart.getChart().data.datasets[0].data;
        await this.bubbleSort(arr);
    }

    private async bubbleSort(arr: Array<any>) {
        let size = arr.length;
        try {
            for (let i = 0; i < size - 1; ++i) {
                await this.handle(0);
                this.chart.mark(i, 'rgb(155, 89, 182)').updateChart();

                for (let j = 0; j < size - i - 1; ++j) {
                    await this.handle(0);

                    this.chart
                        .mark(j, 'rgb(46, 204, 113)')
                        .mark(j + 1, 'rgb(241, 196, 15)')
                        .updateChart();

                    await this.handle();
                    if (arr[j] > arr[j + 1]) {
                        this.chart
                            .mark(j, 'rgb(241, 196, 15)')
                            .mark(j + 1, 'rgb(46, 204, 113)')
                            .updateChart();

                        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                        await this.handle();
                    }

                    this.chart
                        .unMark(j)
                        .unMark(j+1)
                        .updateChart();

                    if (j == i) this.chart.mark(i, 'rgb(155, 89, 182)').updateChart();

                    await this.handle();
                }

                this.chart.unMark(i).updateChart();
                await this.handle();
            }
        }  catch (e) {
            return;
        }
    }
}
