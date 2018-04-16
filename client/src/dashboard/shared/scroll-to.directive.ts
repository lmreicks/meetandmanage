import { ElementRef, Directive,  } from "@angular/core";
import * as moment from 'moment';

@Directive({ selector: '[scrollToNow]'})
export class ScrollToDirective {
    constructor(private elRef: ElementRef) {}
    ngAfterViewInit() {
        this.elRef.nativeElement.children[moment().hours()].scrollIntoView();
    }
}
