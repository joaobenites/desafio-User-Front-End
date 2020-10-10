import { DatePipe } from '@angular/common';

export interface User {
    id: number;
    username: string;
    password: string;
    is_enabled: boolean;
    register_date: Date;
    name: string;
    surname: string;
    email: string;
    phone: string;
}
