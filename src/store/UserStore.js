import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._image = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setImage(image) {
        this._image = image
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get image() {
        return this._image
    }
}