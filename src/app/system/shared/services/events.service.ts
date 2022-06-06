import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApi } from "src/app/shared/core/base-api";
import { WfmEvent } from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi{
    constructor(public override http: HttpClient){
        super(http);
    }

    addEvent(event: WfmEvent): Observable<WfmEvent>{
        return this.post('events', event);
    }

    getEvents(): Observable<WfmEvent[]> {
        return this.get('events');
    }
    
}