import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidebarToggleService {
    public sidebarToggle = new Subject();
    constructor() {}
}
