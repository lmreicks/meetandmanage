import { Injectable } from '@angular/core';

@Injectable()

export class SessionService {
    get currentUserId(): number {
        return +(localStorage.getItem('user_id'));
    }
}
