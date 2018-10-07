import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  fieldTypeab:fieldType[]= [{value:'input', viewValue:'a'},{value:'radio', viewValue:'b'},{value:'checkbox', viewValue:'c'}];

  fieldInputOptions =['text', 'number', 'email','tel'];



  constructor() { }

  ngOnInit() {
  }




}
export interface fieldType {
  value:string;
  viewValue:string;
}