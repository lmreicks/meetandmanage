import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ApiUser } from '../../models/user';
import { GroupService } from '../group.service';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'create-group',
    templateUrl: 'create-group.component.html',
    styleUrls: ['create-group.component.less']
})

/**
 * Creating a group
 */
export class CreateGroupComponent {
    /**
     * Form for creating a new group
     */
    public groupForm: FormGroup;
    /**
     * List of users to populate member dropdown
     */
    public users: ApiUser[];

    constructor(private fb: FormBuilder,
                private groupService: GroupService,
                private userService: UserService,
                private router: Router) {

        this.groupForm = this.fb.group({
            Name: ['', Validators.required ],
            Description: '',
            Members: this.fb.array([])
        });

        this.addMember();
        this.userService.GetAll().then(users => this.users = users);
    }

    /**
     * Add a member to the group's members
     */
    public addMember(): void {
        let arr: FormArray = <FormArray>this.groupForm.controls.Members;

        // add new form control
        arr.push(this.fb.group({
            Id: null,
            Name: '',
            Email: ''
        }));
    }

    /**
     * Remove member control from group's members
     * @param {number} index
     */
    public removeMember(index: number): void {
        let arr: FormArray = <FormArray>this.groupForm.controls.Members;

        arr.removeAt(index);
    }

    /**
     * Gets form array of group member controls
     */
    public getGroupMembers(): FormArray {
        return <FormArray>this.groupForm.controls.Members;
    }

    /**
     * Attempts to validate and create a group
     * Routes to dashboard on success
     * @param {FormGroup} form 
     */
    public createGroup(form: FormGroup): boolean {
        if (!form.valid) return false;

        form.controls.Members.value.pop();

        this.groupService.Create(form.value)
            .then(res => {
                this.router.navigate(['dashboard']);
                return true;
            });
    }
}
