var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Controller } from "../helper/controller";
export class Sort extends Controller {
    constructor(chart, sortEvent = 'sort') {
        super();
        this.shuffleEvent = 'shuffle';
        this.randomEvent = 'random';
        this.chart = chart;
        this.sortEvent = sortEvent;
        this.initEvent();
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
    runAlgorithm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sort();
        });
    }
    stop() {
        super.stop();
        if (this.isCancel())
            this.chart.reset().updateChart();
        return this;
    }
    initEvent() {
        let sort = document.getElementById(this.sortEvent), shuffle = document.getElementById(this.shuffleEvent), random = document.getElementById(this.randomEvent);
        let _this = this;
        sort === null || sort === void 0 ? void 0 : sort.addEventListener('click', function () {
            _this.main();
        });
        shuffle === null || shuffle === void 0 ? void 0 : shuffle.addEventListener('click', function () {
            _this.chart.suffer();
        });
        random === null || random === void 0 ? void 0 : random.addEventListener('click', function () {
            _this.chart.random(60, true, false, -20, 20);
        });
        super.initEvent();
    }
}
