import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { RadioButton } from 'primeng/radiobutton';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { BackButtonComponent } from '../shared/back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { BasicForm } from './models/enc.type';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';

@Component({
  selector: 'web-basic',
  templateUrl: 'basic.html',
  imports: [ButtonModule, DividerModule, CardModule, RadioButton, FormsModule, InputTextModule, FloatLabel, BackButtonComponent, CommonModule, ReactiveFormsModule, TextareaModule, Toast, Message],
  styleUrls: ["basic.css"],
  standalone: true,
  providers: [MessageService]
})

export class BasicPage implements OnInit {
  form!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
      this.form = this.fb.group({
        keyValue: new FormControl("1",[Validators.required]),
        ivValue: new FormControl("0",[Validators.required]),
        keyInput: new FormControl("",[Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
        ivInput: new FormControl("",[Validators.required]),
        encValue: new FormControl("",[Validators.required]),
        decValue: new FormControl("",[Validators.required]),
      })
  }

  get f() {return this.form.controls}

  onBack() {
    this.router.navigate(['/'])
  }

  truncate(input: string) {
    const limitLength = 70;
    if (input.length > limitLength) {
       return input.substring(0, limitLength) + '...';
    }
    return input;
 };

  onCopy(field: string) {
    if (!field) return;
    const copyText = this.f[field].value;
    navigator.clipboard.writeText(copyText);
    this.messageService.add({ severity: "success", summary: "Copy", detail: this.truncate(copyText) || "", life: 2000, icon: "pi pi-copy" });
  }

  async onPaste(field: string) {
    if (!field) return;
    const text = await navigator.clipboard.readText()
    this.f[field].setValue(text);
    this.messageService.add({ severity: "info", summary: "Paste", detail: this.truncate(text) || "", life: 2000, icon: "pi pi-clipboard" });
  }

  onClear(field: string) {
    this.f[field]?.setValue('');
  }

  showInvalidText(field: string) {
    return this.f[field].invalid && this.f[field].touched;
  }

  validateAllFormFields(formGroup: FormGroup) {        
    Object.keys(formGroup.controls).forEach((field) => { 
      const control = formGroup.get(field);            
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {       
        this.validateAllFormFields(control);           
      }
    });
  }

  onEncrype() {
    // this.form.mar
    console.log("this.form.valid:", this.form.valid);
    if (this.form.valid) {

    } else {
      this.validateAllFormFields(this.form);
    }
  }
}