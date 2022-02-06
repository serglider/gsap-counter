const defaultConfig = {
    duration: 2,
    ease: 'none',
    updateRate: 1,
    decimalsEpsilon: 0,
};

export default class Counter {
    constructor(gsapTo, config) {
        this._gsapTo = gsapTo;
        this._config = Object.assign({}, defaultConfig, config);
        this._updateListeners = [];
        this._count = {
            value: 0,
        };
        this._tween = this._gsapTo(this._count, {
            paused: true,
            value: 0,
        });
    }

    /**
     * @param {number} val
     * @returns {Counter}
     */
    setDuration(val) {
        this._config.duration = val;
        return this;
    }

    /**
     * @param {string} val
     * @returns {Counter}
     */
    setEase(val) {
        this._config.ease = val;
        return this;
    }

    /**
     * @param {number} val
     * @returns {Counter}
     */
    setDecimalsEpsilon(val) {
        this._config.decimalsEpsilon = val;
        return this;
    }

    /**
     * @param {number} val
     * @returns {Counter}
     */
    setUpdateRate(val) {
        this._config.updateRate = val;
        return this;
    }

    /**
     * @param  {number} val
     * @returns {Counter}
     */
    setCurrentValue(val) {
        this._count.value = val;
        this._notifyListeners();
        return this;
    }

    /**
     * @returns {Counter}
     */
    resetValue() {
        return this.setCurrentValue(0);
    }

    /**
     * @callback onUpdateCallback
     * @param {number} value
     */

    /**
     * @param {onUpdateCallback} listener
     */
    addListener(listener) {
        this._updateListeners.push(listener);
        return this;
    }

    /**
     * @param {number} targetValue
     * @param {number} initValue
     */
    start(targetValue, initValue = 0) {
        this.setCurrentValue(initValue);
        let tick = 0;
        this._tween = this._gsapTo(this._count, {
            paused: true,
            overwrite: true,
            ease: this._config.ease,
            duration: this._config.duration,
            value: targetValue - this._config.decimalsEpsilon,
            onUpdate: () => {
                tick++;
                this._notifyListeners(tick);
            },
        });

        return this._tween.play().then(() => {
            this.setCurrentValue(targetValue);
            return this;
        });
    }

    /**
     * @param {number} targetValue
     * @returns {Counter}
     */
    startFromCurrent(targetValue) {
        return this.start(targetValue, this._count.value);
    }

    /**
     * @returns {Counter}
     */
    pause() {
        this._tween.pause();
        return this;
    }

    /**
     * @returns {Counter}
     */
    resume() {
        this._tween.resume();
        return this;
    }

    /**
     * @returns {Counter}
     */
    complete() {
        this._tween.progress(1);
        return this;
    }

    /**
     * @param {number} tick
     * @private
     */
    _notifyListeners(tick = 0) {
        if (tick % this._config.updateRate === 0) {
            this._updateListeners.forEach((listener) =>
                listener(this._count.value)
            );
        }
    }
}
