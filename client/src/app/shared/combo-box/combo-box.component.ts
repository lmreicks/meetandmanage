import { Component, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { EventEmitter } from 'events';
import { DropdownMenu } from '../dropdown/dropdown.directive';

const KEY_UP = "ArrowUp";
const KEY_DOWN = "ArrowDown";
const KEY_ENTER = "Enter";

@Component({
    selector: 'combo-box',
    templateUrl: 'combo-box.component.html',
    styleUrls: ['combo-box.component.less']
})

export class ComboBoxComponent implements ControlValueAccessor {
    @Input() options: any[];
    @Input() render: string;
    @Input() disabled: boolean;
    @Output() output: EventEmitter = new EventEmitter();
    @ViewChild('menu') _menu: any;

    private _model: any;

    private propogateChange = (_: any) => {};
    private propogateTouch = (_: any) => {};

    public searchText: string = "";
    private focused: number = 0;

    constructor() {}

    get model(): any {
        return this._model;
    }

    set model(value: any) {
        this._model = value;
        console.log(value);
        this.output.emit(this._model);
    }

    writeValue(obj: any): void {
        this.model = obj;
    }
    registerOnChange(fn: any): void {
        this.propogateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propogateTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onTouched(event: any): void {
        this.propogateTouch(event);
    }

    onChange(event: any): void {
        this.propogateChange(event);
    }

    handleKey(event: any) {
        let children = this._menu.nativeElement.children;
        console.log(children);

        switch (event.key) {
            case (KEY_UP):
                children[this.focused].removeAttribute('class', 'focus');
                if (this.focused > 0) {
                    this.focused--;
                }
                break;
            case (KEY_DOWN):
                if (this.focused < children.length) {
                    this.focused++;
                }
                break;
            case (KEY_ENTER):
                this.model = this.options[this.focused];
                break;
        }

        children[this.focused].setAttribute('class', 'focus');
        console.log(children[this.focused]);
    }
}
