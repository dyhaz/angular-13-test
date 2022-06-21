import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      responseType: 'text'
    });

    return next.handle(newReq).pipe(
      map((event: HttpEvent<any>) => {
        console.log('event', event);
        if (event instanceof HttpResponse) {
          let newEvent: HttpEvent<any>;

          // alter response here. maybe do the following
          newEvent = event.clone({
            // alter event params here
          });

          return newEvent;
        }
      })
    );
  }
}
