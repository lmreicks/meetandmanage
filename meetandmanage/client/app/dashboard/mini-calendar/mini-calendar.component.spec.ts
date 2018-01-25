import { TestBed, inject } from '@angular/core/testing';

import { MiniCalendarComponent } from './mini-calendar.component';

describe('a mini-calendar component', () => {
	let component: MiniCalendarComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MiniCalendarComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MiniCalendarComponent], (MiniCalendarComponent) => {
		component = MiniCalendarComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});