import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({ providedIn: 'root' })
export class CustomUtilityService {

    getProfileInitials(profileName: string): string {
        const profile = profileName.split(' ');
        return (profile.length > 1) ? profile[0].charAt(0) + profile[1].charAt(0) : profile[0].charAt(0)
    }

    getCommaSepareted(data: any): string {

        if (data && data.length) {
            const idArray = data.map(
                (item: any) => {
                    return item && item.name ? item.name : null;
                });
            return idArray.sort().join(', ');
        } else {
            return '-';
        }
    }

    getArraysOfId(data: any): Array<string | number> {
        const ids = [];

        if (data?.length) {
            data.forEach((element: any) => {
                ids.push(element.id);
            });
        }
        return ids;
    }

    getArraysOfCode(data: any): Array<string> {
        const codes = [];

        if (data?.length) {
            data.forEach((element: any) => {
                codes.push(element.Code || element.code); //to be changed from backend
            });
        }
        return codes;
    }

    getArraysOfName(data: any): Array<string> {
        const codes = [];

        if (data?.length) {
            data.forEach((element: any) => {
                codes.push(' ' + element.name);
            });
        }
        return codes;
    }

    getArraysOfCodeAndName(data: any): Array<string> {
        const codesAndNames = [];

        if (data?.length) {
            data.forEach((element: any) => {
                codesAndNames.push({ code: element.Code || element.code, name: element.name });
            });
        }
        return codesAndNames;
    }

    prepareAccountObject(account) {
        if (account) {
            if (account.firstName && account.lastName) {

                account.initials = account.firstName.charAt(0) + account.lastName.charAt(0);
                account.fullName = account.firstName + ' ' + account.lastName;

            } else if (account.firstName && !account.lastName) {

                account.initials = account.firstName.charAt(0);
                account.fullName = account.firstName;

            } else if (!account.firstName && account.lastName) {

                account.initials = account.lastName.charAt(0);
                account.fullName = account.lastName;

            } else {
                account.initials = '!';
                account.fullName = 'No Name';
            }

        }
        return account;
    }

    titleCase(sendMeString: string): string {
        const splitStr = sendMeString.toLowerCase().split(' ');

        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    getModifiedDate(rawDate, addDays?: number): Date {

        let modifiedDate;

        const dateToModify = moment(moment(rawDate).add(addDays, 'd').format('YYYY/MM/DD HH:mm:ss'));
        if (addDays) {
            if (moment().diff(dateToModify) >= 0) {
                modifiedDate = dateToModify;
                // modifiedDate = moment(+moment(dateToModify).endOf('day')).format('YYYY/MM/DD HH:mm:ss');
            }
            else {
                modifiedDate = new Date();
                // modifiedDate = moment(+moment(new Date()).endOf('day')).format('YYYY/MM/DD HH:mm:ss');
            }
        } else {
            modifiedDate = new Date();
            // modifiedDate = moment(+moment(new Date()).endOf('day')).format('YYYY/MM/DD HH:mm:ss');
        }

        return modifiedDate;
    }

}
