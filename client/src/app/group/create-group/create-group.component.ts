import { Component, ElementRef, ViewChild } from '@angular/core';
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

export class CreateGroupComponent {
    @ViewChild('memberDropdown')
    public memberDropdown: ElementRef;
    public groupForm: FormGroup;
    public memberNotFound: boolean = false;
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
    }

    ngOnInit(): void {
        this.userService.GetAll().then(users => this.users = users);
    }

    public addMember(): void {
        let arr: FormArray = <FormArray>this.groupForm.controls.Members;

        // add new form control
        arr.push(this.fb.group({
            Id: null,
            Name: '',
            Email: ''
        }));
    }

    public removeMember(index: number): void {
        let arr: FormArray = <FormArray>this.groupForm.controls.Members;

        arr.removeAt(index);
    }

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
