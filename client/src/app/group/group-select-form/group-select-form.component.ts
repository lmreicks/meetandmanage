import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiGroup } from '../../models/group';

@Component({
    selector: 'group-select',
    templateUrl: 'group-select-form.component.html'
})

export class GroupSelectForm {
    @ViewChild('groupDropdown') groupDropdown: ElementRef;
    @Input('group') groupForm: FormGroup;
    @Input('groups') groups: ApiGroup[];
    @Output() added: EventEmitter<ApiGroup> = new EventEmitter();

    groupNotFound: boolean = false;

    constructor() {}

    public groupSearch(): void {
        let el = this.groupDropdown.nativeElement;
        if (el.children.length === 0) {
            this.groupNotFound = true;
        } else if (el.children.length === 1 && el.children[0].id === "not-found") {
            this.groupNotFound = true;
        } else {
            this.groupNotFound = false;
        }
    }

    public addGroup(group: ApiGroup): void {
        this.groupForm.patchValue(group);
    }
}
