import Chart from 'chart.js/auto';
import { DataHelper } from "./dataHelper";
export class BarChart {
    constructor(element, data = {}, color = 'rgb(255,0,0)') {
        this.dataFeed = {
            data: [],
            label: [],
            backgroundColor: []
        };
        this.element = element;
        this.baseColor = color;
        this.dataHelper = new DataHelper();
        this.defaultData = data;
        this.chart = this.renderChart();
    }
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    processDataInput(data = null) {
        if (data != null) {
            this.refreshDataFeed();
            Object.entries(data).forEach(([key, value], index) => {
                this.dataFeed.label.push("Index " + key);
                this.dataFeed.data.push(value);
                this.dataFeed.backgroundColor.push(this.baseColor);
            });
        }
        else {
            if (!this.dataFeed.data.length) {
                Object.entries(this.defaultData).forEach(([key, value], index) => {
                    this.dataFeed.label.push("Index " + key);
                    this.dataFeed.data.push(value);
                    this.dataFeed.backgroundColor.push(this.baseColor);
                });
            }
        }
        return this.dataFeed;
    }
    renderChart() {
        this.processDataInput();
        return new Chart(this.element, this.getConfig());
    }
    getConfig() {
        return this.config ? this.config : this.getDefaultConfig();
    }
    getDefaultConfig() {
        return {
            type: 'bar',
            data: {
                labels: this.dataFeed.label,
                datasets: [
                    {
                        label: 'Value',
                        data: this.dataFeed.data,
                        backgroundColor: this.dataFeed.backgroundColor
                    }
                ]
            },
            options: {
                animation: {
                    duration: 100,
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        };
    }
    refreshDataFeed() {
        this.dataFeed = {
            data: [],
            label: [],
            backgroundColor: []
        };
        return this;
    }
    getChart() {
        return this.chart;
    }
    updateChart() {
        this.getChart().update();
        return this;
    }
    updateChartData(data) {
        this.processDataInput(data);
        this.getChart().data.datasets = [
            {
                label: 'Value',
                data: this.dataFeed.data,
                backgroundColor: this.dataFeed.backgroundColor
            }
        ];
        this.getChart().data.labels = this.dataFeed.label;
        return this;
    }
    suffer() {
        let arr = this.dataHelper.shuffleData(this.dataFeed.data);
        this.defaultData = arr;
        return this.updateChartData(arr).updateChart();
    }
    random(size, isInt = true, isUnique = false, begin = Number.MIN_SAFE_INTEGER, end = Number.MAX_SAFE_INTEGER) {
        let arr = this.dataHelper.getRandomData(size, isInt, isUnique, begin, end);
        this.defaultData = arr;
        return this.updateChartData(arr).updateChart();
    }
    setBarColor(index, color) {
        let bg = this.getChart().config.data.datasets[0].backgroundColor, size = bg.length;
        if (index < 0 || index >= size)
            return this;
        bg[index] = color;
        return this;
    }
    mark(index, color) {
        return this.setBarColor(index, color);
    }
    unMark(index) {
        return this.setBarColor(index, this.baseColor);
    }
    reset() {
        this.updateChartData(this.defaultData);
        return this;
    }
}
