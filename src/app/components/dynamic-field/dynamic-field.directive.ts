import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

//componentMapper  maps the field types (input, select, button, date, radiobutton, checkbox) to the corresponding field component.

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent
};


@Directive({
  selector: '[dynamicField]'
})


// Change the selector attribute to [dynamicField] and create the @Input() binding variables field 
// and group which receive the input from the parent component and assign it to the corresponding field component.


export class DynamicFieldDirective implements OnInit {

  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  // Use the resolveComponentFactory method of ComponentFactoryResolver to create the component factory based on field type defined in the configuration.
  // Use the createComponent method of ViewContainerRef to create the component from the component factory.
  // Pass field and group properties into dynamically created component via this.componentRef.instance.

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

  //Create a variable componentRef of type any. It maintains the instance of dynamically created component.

  componentRef: any;

  // inject “ComponentFactoryResolver” and “ViewContainerRef” services in the constructor. 
  // The ComponentFactoryResolver will be used to resolve the component at run time. 
  // This service contains resolveComponentFactory method which can be used to create a component at run time. 
  // The ViewContainerRef to gain access to the view container of the element that will host the dynamically added component.


  constructor(private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }

}
