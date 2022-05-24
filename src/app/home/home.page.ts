import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {

      // get current position
      geolocation.getCurrentPosition().then((pos) => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });

      const watch = geolocation.watchPosition().subscribe((pos: any) => {
        if (pos.coords) {
          console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        }
      });

      // to stop watching
      watch.unsubscribe();

    });
  }

}
