import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, Validator } from "../../field.interface";

@Component({
  selector: 'dynamic-form',
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})


export class DynamicFormComponent implements OnInit {

  // @Input()fields of type FieldConfig that accept a configuration array from parent component.
  // @Output()submit of type EventEmitter<any> it will notify the parent component when the form is submitted.
  // form of type FormGroup it aggregates the values of each child FormControl .

  @Input() fields: FieldConfig[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //creates the control dynamically and returns the FormGroup.
    this.form = this.createControl();
  }



  get value() {

    return this.form.value;

  }

  // create a control. It loops through the configuration fields and creates a control for each field with validations and 
  // then add these dynamically created controls to the form group.
  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );

      group.addControl(field.name, control);

    });
    return group;
  }
  //add validations to dynamic control.
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }
  //if the form is valid, the parent submit method is fired otherwise validation errors will be displayed.
  onSubmit(event: Event) {

    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  //validate all form fields
  validateAllFormFields(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach(field => {
    
    const control = formGroup.get(field);
    
    control.markAsTouched({ onlySelf: true });
    
    });
    
    }

}
