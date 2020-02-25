import { Component, OnInit } from "@angular/core";
import { Observable, interval, Subscription } from "rxjs";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.scss"]
})
export class TimerComponent implements OnInit {
  currentTime: number =0;
  subscription: Subscription = new Subscription();
  constructor() {}

  ngOnInit(): void {
   this.getTimer().subscribe(() => {});
    // this.subscription.add(this.time$._subscribe);
  }

  secondsToHms() {
    const d = Number(this.currentTime);
    const ms = Math.floor(d  % 100);
    const s = Math.floor((d / 100 % 60));
    const m = Math.floor(d  / 6000 % 60);
    const h = Math.floor(d / (60000*60) % 60);

    const hDisplay = h > 0 ? ("0" + h).slice(-2) + ":" : "00:";
    const mDisplay = m > 0 ? ("0" + m).slice(-2) + ":" : "00:";
    const sDisplay = s > 0 ? ("0" + s).slice(-2) + ":" : "00:";
    const msDisplay = ms > 0 ? ("0" + ms).slice(-2) : "00";
    return hDisplay + mDisplay + sDisplay + msDisplay;
  }

  getTimer(): Observable<number> {
    return Observable.create($obs => {
      this.subscription = interval(10).subscribe(() => {
        $obs.next(this.currentTime + 10);
        this.currentTime++;
        console.log(this.currentTime)
      });
    });
  }

  continue() {
    this.getTimer().subscribe(() => {});
  }

  stop() {
    this.subscription.unsubscribe();
  }
}
