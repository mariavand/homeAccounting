import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Bill } from "../models/bill.model";

@Injectable()
export class BillService{
    constructor(private http: HttpClient){}

    getBill(): Observable<Bill>{
        return this.http.get('http://localhost:3000/bill')
            .pipe(map((response: any) => response));
    }

    getCurrency(base: string = 'EUR'): Observable<any>{
        return this.http.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=1d1740ded2a59f127c381c8fb597aa6810be1106&from=${base}&amount=1&format=json`)
            .pipe(map((response: any) => response));
    }

}