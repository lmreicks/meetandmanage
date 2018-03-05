import {
    forwardRef,
    Inject,
    Directive,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ContentChild,
    Renderer2,
    OnInit
} from '@angular/core';

/**
 */
@Directive(
    { selector: '[dropdownMenu]', host: { '[class.dropdown-menu]': 'true', '[class.show]': 'dropdown.isOpen()' } })
export class DropdownMenu {
    isOpen = false;

    constructor(
        @Inject(forwardRef(() => Dropdown)) public dropdown, private _elementRef: ElementRef,
        private _renderer: Renderer2) { }

    isEventFrom($event) { return this._elementRef.nativeElement.contains($event.target); }
}

/**
 * Allows the dropdown to be toggled via click. This directive is optional.
 */
@Directive({
    selector: '[dropdownToggle]',
    host: {
        'class': 'dropdown-toggle',
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'dropdown.isOpen()',
        '(click)': 'toggleOpen()'
    }
})
export class DropdownToggle {
    anchorEl;

    constructor(@Inject(forwardRef(() => Dropdown)) public dropdown, private _elementRef: ElementRef) {
        this.anchorEl = _elementRef.nativeElement;
    }

    toggleOpen() { this.dropdown.toggle(); }

    isEventFrom($event) { return this._elementRef.nativeElement.contains($event.target); }
}

/**
 * Transforms a node into a dropdown.
 */
@Directive({
    selector: '[ngbDropdown]',
    exportAs: 'ngbDropdown',
    host: {
        '[class.show]': 'isOpen()',
        '(keyup.esc)': 'closeFromOutsideEsc()',
        '(keydown)': 'handleKey($event)',
        '(document:click)': 'closeFromClick($event)'
    }
})
export class Dropdown implements OnInit {

    @ContentChild(DropdownMenu) private _menu: DropdownMenu;

    @ContentChild(DropdownToggle) private _toggle: DropdownToggle;

    /**
     * Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
     * When it is true (default) dropdowns are automatically closed on both outside and inside (menu) clicks.
     * When it is false dropdowns are never automatically closed.
     * When it is 'outside' dropdowns are automatically closed on outside clicks but not on menu clicks.
     * When it is 'inside' dropdowns are automatically on menu clicks but not on outside clicks.
     */
    @Input() autoClose: boolean | 'outside' | 'inside';

    /**
     *  Defines whether or not the dropdown-menu is open initially.
     */
    @Input('open') _open = false;


    /**
     *  An event fired when the dropdown is opened or closed.
     *  Event's payload equals whether dropdown is open.
     */
    @Output() openChange = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    /**
     * Checks if the dropdown menu is open or not.
     */
    isOpen(): boolean { return this._open; }

    /**
     * Opens the dropdown menu of a given navbar or tabbed navigation.
     */
    open(): void {
        if (!this._open) {
            this._open = true;
            this.openChange.emit(true);
        }
    }

    /**
     * Closes the dropdown menu of a given navbar or tabbed navigation.
     */
    close(): void {
        if (this._open) {
            this._open = false;
            this.openChange.emit(false);
        }
    }

    /**
     * Toggles the dropdown menu of a given navbar or tabbed navigation.
     */
    toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    closeFromClick($event) {
        if (this.autoClose && $event.button !== 2 && !this._isEventFromToggle($event)) {
            if (this.autoClose === true) {
                this.close();
            } else if (this.autoClose === 'inside' && this._isEventFromMenu($event)) {
                this.close();
            } else if (this.autoClose === 'outside' && !this._isEventFromMenu($event)) {
                this.close();
            }
        }
    }

    closeFromOutsideEsc() {
        if (this.autoClose) {
            this.close();
        }
    }

    handleKey(event: any) {
        console.log(event);
    }

    private _isEventFromToggle($event) { return this._toggle ? this._toggle.isEventFrom($event) : false; }

    private _isEventFromMenu($event) { return this._menu ? this._menu.isEventFrom($event) : false; }
}
