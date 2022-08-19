import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }
  
  export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
  }
  
  export function padNumber(value: number) {
    if (isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }
  @Injectable()
  export class DatepickerFormat extends NgbDateParserFormatter {
  
    parse(value: string): NgbDateStruct {
      if (value) {
        const dateParts = value.trim().split('/');
        if (dateParts.length === 1 && isNumber(dateParts[0])) {
          return { year: toInteger(dateParts[0]), month: -99 , day: -99 };
        } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
          return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: -99 };
        } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
          return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
        }
      }
      return { year: -99 , month: -99 , day: -99 };
    }
  
    format(date: NgbDateStruct): string {
      return date ?
        `${date.year}/${isNumber(date.month) ? padNumber(date.month) : ''}/${isNumber(date.day) ? padNumber(date.day) : ''}` :
        '';
    }
  
  }