import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable";

@Injectable()
export class ServerTimeService {
    server_time: number;
    source = Observable.interval(1000);

    constructor() {
        this.server_time = new Date().getTime() + (60 * 60 * 2 * 1000); //Simulate different server time
        const subscribe = this.source.subscribe(val => {
            this.server_time += 1000;
        });
    }

    public getTime() {
        return new Date(this.server_time);
    }

}