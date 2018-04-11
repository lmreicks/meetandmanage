import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ApiUser } from '../../models/user';

@Component({
    selector: 'member-form',
    templateUrl: 'member.component.html'
})

export class MemberFormComponent {
    @ViewChild('memberDropdown') memberDropdown: ElementRef;
    @Input('member') memberForm: FormGroup;
    @Input('users') users: ApiUser[];
    @Output() added: EventEmitter<ApiUser> = new EventEmitter();

    memberNotFound: boolean = false;

    constructor() {}

    public memberSearch(): void {
        let el = this.memberDropdown.nativeElement;
        if (el.children.length === 0) {
            this.memberNotFound = true;
        } else if (el.children.length === 1 && el.children[0].id === "not-found") {
            this.memberNotFound = true;
        } else {
            this.memberNotFound = false;
        }
    }

    public addMember(user: ApiUser): void {
        this.memberForm.patchValue(user);
        this.added.emit(user);
    }
}
