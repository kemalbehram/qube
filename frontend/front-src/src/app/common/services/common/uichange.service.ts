import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UichangeService {

  constructor() { }

  //
    changebackground() {
      document.getElementById("loader-cnt").style.cssText = "display: block;  color: white;font-weight: bold; position: absolute; top: 50%;left: 50%;transform: translate(-50%, -50%); z-index: 100; width: 100%; padding: 20px; text-align: center;";
      document.getElementById('wait_msg').style.display = 'block';
      document.getElementById('cover-spin').style.display = 'block';
      document.getElementById("site-cnt").style.cssText = "display: block; opacity:0.2";
    }

    clearbackground() {
      document.getElementById('loader-cnt').style.display = 'none';
      document.getElementById("loader-cnt").style.cssText = "z-index: 0";
      document.getElementById('wait_msg').style.display = 'none';
      document.getElementById('cover-spin').style.display = 'none';
      document.getElementById("site-cnt").style.cssText = "display: block; opacity:1;";
    }
  //
}