import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'edit-group',
    templateUrl: 'edit-group.component.html',
    styleUrls: ['edit-group.component.less']
})

export class EditGroupComponent {
    public groupForm: FormGroup;

    constructor(private fb: FormBuilder) {}

}
