import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'create-group',
    templateUrl: 'create-group.component.html',
    styleUrls: ['create-group.component.less']
})

export class CreateGroupComponent {
    public groupForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this._buildForm();
    }

    private _buildForm(): void {
        this.groupForm = this.fb.group({
            Name: ['', Validators.required ],
            Description: '',
            Members: this.fb.array([
                ''
            ])
        });
    }
}
