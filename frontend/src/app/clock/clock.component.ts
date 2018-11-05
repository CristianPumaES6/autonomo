import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'if-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const HHAND: HTMLOrSVGImageElement = document.querySelector("#hour");
        const MHAND: HTMLOrSVGImageElement = document.querySelector("#minute");
        const SHAND: HTMLOrSVGImageElement = document.querySelector("#second");

        let digits = document.querySelectorAll<HTMLOrSVGImageElement>('.digit');
        let digitsArray = Array.from(digits);


        function runClock() {
            let date = new Date(),
                hr = date.getHours(),
                min = date.getMinutes(),
                sec = date.getSeconds(),
                msec = date.getMilliseconds(),
                hrPos = hr * 360 / 12 + min * (360 / 60) / 12,
                minPos = min * 360 / 60 + sec * (360 / 60) / 60,
                secPos = sec * 360 / 60 + msec * (360 / 1000) / 60,
                hours = hr;
            if (hr > 12 && hr !== 0) {
                hours = hr - 12;
            } else if (hr == 0) {
                hours = 12;
            }
            for (let i = 0; i < digitsArray.length; i++) {

                digitsArray[i].style.opacity = "0";
                if (i + 1 == hours) {
                    digitsArray[i].style.opacity = "1";
                }
            }

            HHAND.style.transform = "rotate(" + hrPos + "deg)";
            MHAND.style.transform = "rotate(" + minPos + "deg)";
            SHAND.style.transform = "rotate(" + secPos + "deg)";
        }



        let interval = setInterval(runClock, 1000);

    }

}
