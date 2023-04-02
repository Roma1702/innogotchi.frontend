import { makeAutoObservable } from "mobx"

export default class InnogotchiStore {
    constructor() {
        this._innogotchi = []
        this._innogotchiState = []
        this._page = 1
        this._totalCount = 0
        this._size = 2
        this._filter = "happyDays"
        makeAutoObservable(this)
    }

    setInnogotchi(innogotchi) {
        this._innogotchi = innogotchi
    }
    setInnogotchiState(innogotchiState) {
        this._innogotchiState = innogotchiState
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setFilter(filter) {
        this._filter = filter
    }

    get innogotchi() {
        return this._innogotchi
    }
    get innogotchiState() {
        return this._innogotchiState
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get size() {
        return this._size
    }
    get filter() {
        return this._filter
    }
}