

export class Controller {
    _delayTime: number;
    _freeze: boolean;
    _cancel: boolean;
    _isRunning: boolean;
    playEvent: string;
    cancelEvent: string;

    private readonly defaultDelayTime = 100;

    constructor() {
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

    async main() {
        if (this.isRunning)
            return;

        this.start();
        await this.runAlgorithm();

        this.end();
    }

    async runAlgorithm() {}

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

    async handle(ms: number | null = null) {
        if (this.isCancel()) {
            throw new Error('Cancel!');
        }

        if (this.isPause()) {
            await this.delay(this.defaultDelayTime);
            await this.handle();
            return;
        }

        return this.delay(ms);
    }

    private delay(ms: number | null) {
        return new Promise( resolve => setTimeout(resolve, ms != null ? ms : this.delayTime));
    }

    initEvent() {
        let play = document.getElementById(this.playEvent),
            cancel = document.getElementById(this.cancelEvent),
            _this = this;

        play?.addEventListener('click', function () {
            console.log(_this.isPause());
            if (_this.isPause())
                _this.continue();
            else
                _this.pause();
        });

        cancel?.addEventListener('click', function () {
            _this.stop();
        });
    }
}
