import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiGroup } from '../../models/group';

@Component({
    selector: 'group-select',
    templateUrl: 'group-select-form.component.html'
})

export class GroupSelectForm {
    /**
     * Dropdown element
     */
    @ViewChild('groupDropdown') groupDropdown: ElementRef;
    /**
     * empty group Form Group
     */
    @Input('group') groupForm: FormGroup;
    /**
     * List of groups that the user can choose from
     */
    @Input('groups') groups: ApiGroup[];
    /**
     * Event emitter for when a new group is selected
     */
    @Output() added: EventEmitter<ApiGroup> = new EventEmitter();

    /**
     * Boolean to display a message if no groups are found/match your search criteria
     */
    groupNotFound: boolean = false;

    constructor() {}

    /**
     * Finds a group by search
     */
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

    /**
     * Adds a group's value to the group form
     * @param {ApiGroup} group 
     */
    public addGroup(group: ApiGroup): void {
        this.groupForm.patchValue(group);
    }
}
