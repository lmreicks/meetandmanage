import {
    Component,
    ElementRef,
    ViewChild,
    NgZone,
    forwardRef,
    Input,
    Output,
    EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LocationInput),
    multi: true
};

export interface Location {
    Address: string;
    Latitude: number;
    Longitude: number;
}

@Component({
    selector: 'location-input',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    template: `
        <input placeholder="Add Location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [(ngModel)]="value">
        `
})
export class LocationInput implements ControlValueAccessor {
    @ViewChild('search')
    public search: ElementRef;

    @Input() disabled: boolean;
    @Output() change: EventEmitter<Location> = new EventEmitter();

    private location: Location;
    private innerValue: any;

    constructor(
        private mapApiLoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    private onTouchedCallback: () => () => {};
    private onChangeCallback: (_: any) => () => {};

    // get accessor
    get value(): any {
        return this.innerValue;
    };

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }

        // set latitude, longitude and zoom
        this.change.emit(this.location);
    }

    ngOnInit(): void {
        this.location = { Address: "", Latitude: 0, Longitude: 0 };
        this.setCurrentPosition();

        this.mapApiLoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.search.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    // get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    this.location = {
                        Address: place.formatted_address,
                        Latitude: place.geometry.location.lat(),
                        Longitude: place.geometry.location.lng()
                    };

                    this.value = place.formatted_address;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
            this.location.Latitude = position.coords.latitude;
            this.location.Longitude = position.coords.longitude;
            });
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
