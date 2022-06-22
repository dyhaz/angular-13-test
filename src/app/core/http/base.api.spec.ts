import { TestBed, waitForAsync } from "@angular/core/testing";
import { BaseApi, RequestMethod } from "./base.api";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { firstValueFrom } from "rxjs";
import { HttpErrorInterceptor } from "./httperrorinterceptor.service";
import { ResponseInterceptor } from "./httpresponseinterceptor.service";

describe('AppComponent', () => {
  let app: BaseApi;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseInterceptor,
          multi: true
        }
      ],
      imports: [
        CommonModule,
        IonicModule,
        HttpClientModule
      ],
    }).compileComponents();
    app = TestBed.inject(BaseApi);
  }));

  it("should request get", async () => {
    expect(app).toBeTruthy();
    const response = await firstValueFrom(app.request({
      params: {},
      url: "https://jsonplaceholder.typicode.com/todos/1",
      timeout: 1000,
      method: RequestMethod.GET
    }));
    console.log(response);
  });

  it("should request get using fetch", async () => {
    expect(app).toBeTruthy();
    let data = {
      params: {},
      url: "http://localhost:3000/dummy",
      timeout: 1000,
      method: RequestMethod.GET
    };
    let httpHeaders: HttpHeaders;
    let headers = new HttpHeaders({ timeout: `${data?.timeout}` });

    if (httpHeaders) {
      httpHeaders.append('timeout', `${data?.timeout}`);
    } else {
      httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
        'Access-Control-Allow-Origin': '*'
      });
    }
    headers = httpHeaders;

    // const httpOptions = {
    //   headers: httpHeaders, body: data?.params
    // };

    try {
      const response = await fetch(`${data?.url}`, {
        headers: JSON.parse(JSON.stringify(headers)),
        method: data?.method
        // body: data?.params
      });

      console.log('url:', response.url)
      console.log('status:', response.status);
    } catch (e) {
      // console.log('error', e);
    }
  });
});
