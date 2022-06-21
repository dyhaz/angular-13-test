import { TestBed, waitForAsync } from "@angular/core/testing";
import { BaseApi, RequestMethod } from "./base.api";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpErrorResponse } from "@angular/common/http";
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
      url: "https://gitlab.com/assets/",
      timeout: 1000,
      method: RequestMethod.GET
    }));
    console.log(response);
  });
});
