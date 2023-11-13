import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  messages: string[] = []

  constructor(){
    debugger
  }

  log(message: string){
    debugger;
    this.messages.push(message)
  }
}
