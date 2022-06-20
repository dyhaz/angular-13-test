import { TestBed, waitForAsync } from "@angular/core/testing";
import { BaseApi, RequestMethod } from "./base.api";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { firstValueFrom } from "rxjs";

describe('AppComponent', () => {
  let app: BaseApi;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      providers: [
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
      url: "http://localhost:4554",
      timeout: 1000,
      method: RequestMethod.GET
    }));
    console.log(response);
  });
});
