import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const api = environment.apiUrl;

@Injectable({providedIn: "root"})
export class MemberService {

  constructor(private _http: HttpClient) {
  }

  login(param: HttpParams): Observable<any> {
    return this._http.post(`${api}loginMember`, param, {withCredentials: true});
  }

  register(param: HttpParams): Observable<any> {
    return this._http.post(`${api}registerMember`, param, {withCredentials: true});
  }

  fetchMovies(): Observable<any> {
    return this._http.get(`${api}fetchAllBooks`, {withCredentials: true});
  }

  fetchPurchasedBooks(): Observable<any> {
    let userId: any = sessionStorage.getItem("member.user.userid");
    let param = new HttpParams().append("memberId", `${userId}`)
    return this._http.get(`${api}fetchMemberPurchaseBooks`, {params: param, withCredentials: true});
  }

  savePurchaseBook(data: HttpParams): Observable<any> {
    return this._http.post(`${api}savePurchaseBook`, data, {withCredentials: true});
  }

}
