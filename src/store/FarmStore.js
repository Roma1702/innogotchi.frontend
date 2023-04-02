import { makeAutoObservable } from "mobx"

export default class FarmStore {
    constructor() {
        this._farm = {}
        this._statistic = {}
        makeAutoObservable(this)
    }

    setFarm(farm) {
        this._farm = farm
    }
    setStatistic(statistic) {
        this._statistic = statistic
    }

    get farm() {
        return this._farm
    }
    get statistic() {
        return this._statistic
    }
}