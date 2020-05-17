export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) { // meaning, if the current date is beyond the expiration date
            return null;
        }
        return this._token
    }
 }