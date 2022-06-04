import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseApi } from "src/app/shared/core/base-api";
import { Bill } from "../models/bill.model";

@Injectable()
export class BillService extends BaseApi{
    constructor(public override http: HttpClient){
        super(http);
    }

    updateBill(bill: Bill): Observable<Bill>{
        return this.put('bill', bill);
    }

    getBill(): Observable<Bill>{
        return this.get('bill');
    }

    getCurrency(base: string = 'EUR'): Observable<any>{
        return this.http.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=1d1740ded2a59f127c381c8fb597aa6810be1106&from=${base}&amount=1&format=json`)
            .pipe(map((response: any) => response));
    }

}