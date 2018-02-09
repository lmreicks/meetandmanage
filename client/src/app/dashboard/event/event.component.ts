import { Component, OnInit } from '@angular/core';
import { ApiEvent } from '../../models/event';

@Component({
	selector: 'event',
	templateUrl: 'event.component.html'
})

export class EventComponent implements OnInit {
	ngOnInit() { }

	ngOnChanges(): void {
	}

	submit() {
	}
}