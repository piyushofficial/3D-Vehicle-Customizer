import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    getSnackbar(message: string, duration?: string) {

        const me = this;
        const minDuration = 3000;
        const mediumDuration = 4000;
        const maxDuration = 5500;
        const defaultDuration = 2500;

        switch (duration) {
            case 'minDuration':
                return me.openSnackBar(message, minDuration);
            case 'mediumDuration':
                return me.openSnackBar(message, mediumDuration);
            case 'maxDuration':
                return me.openSnackBar(message, maxDuration);
            default:
                return me.openSnackBar(message, defaultDuration);
        }
    }

    openSnackBar(message: string, time: number) {
        const me = this;

        return me.snackBar.open(message, 'x', {
            duration: time,
            verticalPosition: 'bottom',
            horizontalPosition: 'right'
        });
    }

    showErrorMessage(error) {
        const me = this;

        return me.getSnackbar((error?.error?.message)
            || (error?.error?.error?.message)
            || 'Internal server error', 'mediumDuration');
    }
}
