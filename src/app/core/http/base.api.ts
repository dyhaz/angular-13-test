import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}

export interface RequestData {
  timeout?: number,
  params?: any,
  method: RequestMethod,
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class BaseApi {
  constructor(
    private http: HttpClient,
  ) { }

  public request<T>(data?: RequestData, httpHeaders?: HttpHeaders): Observable<T> {
    let headers = new HttpHeaders({ timeout: `${data?.timeout}` });

    if (httpHeaders) {
      httpHeaders.append('timeout', `${data?.timeout}`);
      headers = httpHeaders;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      }), body: data?.params
    };

    switch (data?.method) {
      case RequestMethod.GET:
        return this.http.get<T>(`${data?.url}`, { headers });
      case RequestMethod.POST:
        return this.http.post<T>(`${data?.url}`, data?.params || {}, { headers });
      case RequestMethod.DELETE:
        return this.http.delete<T>(data?.url, httpOptions);
      case RequestMethod.PUT:
        return this.http.put<T>(data?.url, data?.params, { headers });
    }
  }
}


