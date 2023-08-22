import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const api = environment.apiUrl;

@Injectable({providedIn: "root"})
export class AdminService {

  constructor(private _http: HttpClient) {
  }

  login(param: HttpParams): Observable<any> {
    return this._http.post(`${api}loginAdmin`, param, {withCredentials: true});
  }

  saveBook(data: HttpParams): Observable<any> {
    return this._http.post(`${api}saveBook`, data, {withCredentials: true});
  }

  activateMember(id: any): Observable<any> {
    const data = new HttpParams().append("memberid", id);
    return this._http.post(`${api}activateMember`, data, {withCredentials: true});
  }

  fetchBooks(): Observable<any> {
    return this._http.get(`${api}fetchAllBooks`, {withCredentials: true});
  }

  fetchMember(): Observable<any> {
    return this._http.get(`${api}fetchAllMembers`, {withCredentials: true});
  }

  fetchPurchaseBooks(): Observable<any> {
    return this._http.get(`${api}fetchAllPurchaseBooks`, {withCredentials: true});
  }

}
