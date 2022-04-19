import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public formParent: FormGroup = new FormGroup({});

  ngOnInit(): void {

    this.initFormParent()
    
  }

  initFormParent(): void{
    this.formParent = new FormGroup(
      {
        country: new FormControl('', [Validators.required, Validators.minLength(5)]),
        area: new FormArray([], [Validators.required])
      }
    )

  }

  initFormArea(): FormGroup {

    return new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),      
      }
    )

  }



  addArea(): void{

    const refArea = this.formParent.get('area') as FormArray;
    refArea.push(this.initFormArea())

  }



  getCtrl(key: string, form: FormGroup): any{
    return form.get(key)
  }

  removeValidation(index: number, key: string): void {

    const refParent = this.formParent.get('area') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;

    refSingle.clearValidators();
    refSingle.updateValueAndValidity();

  }

  //TODO: Agregar validaciones
  addValidation(index: number, key: string): void {

    const refParent = this.formParent.get('area') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;

    refSingle.setValidators(
      [
        Validators.required,
        Validators.minLength(6)
      ]
    )
    refSingle.updateValueAndValidity();
  }

}
