var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Controller {
    constructor() {
        this.defaultDelayTime = 100;
        this._delayTime = this.defaultDelayTime;
        this._freeze = false;
        this._cancel = false;
        this._isRunning = false;
        this.playEvent = 'play';
        this.cancelEvent = 'cancel';
    }
    get cancel() {
        return this._cancel;
    }
    set cancel(bool) {
        this._cancel = bool;
    }
    get delayTime() {
        return this._delayTime;
    }
    set delayTime(ms) {
        this._delayTime = ms;
    }
    get freeze() {
        return this._freeze;
    }
    set freeze(bool) {
        this._freeze = bool;
    }
    get isRunning() {
        return this._isRunning;
    }
    set isRunning(bool) {
        this._isRunning = bool;
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRunning)
                return;
            this.start();
            yield this.runAlgorithm();
            this.end();
        });
    }
    runAlgorithm() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    start() {
        this.isRunning = true;
        this.reset();
        return this;
    }
    end() {
        this.isRunning = false;
        this.reset();
        return this;
    }
    reset() {
        this.cancel = false;
        this.freeze = false;
        return this;
    }
    isCancel() {
        return this.cancel;
    }
    canCancel() {
        return this.isRunning && !this.isCancel();
    }
    stop() {
        if (this.canCancel())
            this.cancel = true;
        return this;
    }
    canPause() {
        return this.canCancel() && !this.isPause();
    }
    pause() {
        if (this.canPause())
            this.freeze = true;
        return this;
    }
    continue() {
        if (!this.canPause())
            this.freeze = false;
        return this;
    }
    isPause() {
        return this.freeze;
    }
    handle(ms = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isCancel()) {
                throw new Error('Cancel!');
            }
            if (this.isPause()) {
                yield this.delay(this.defaultDelayTime);
                yield this.handle();
                return;
            }
            return this.delay(ms);
        });
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms != null ? ms : this.delayTime));
    }
    initEvent() {
        let play = document.getElementById(this.playEvent), cancel = document.getElementById(this.cancelEvent), _this = this;
        play === null || play === void 0 ? void 0 : play.addEventListener('click', function () {
            console.log(_this.isPause());
            if (_this.isPause())
                _this.continue();
            else
                _this.pause();
        });
        cancel === null || cancel === void 0 ? void 0 : cancel.addEventListener('click', function () {
            _this.stop();
        });
    }
}
