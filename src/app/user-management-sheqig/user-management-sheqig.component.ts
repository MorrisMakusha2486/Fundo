import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-user-management-sheqig',
  standalone: true,
  templateUrl: './user-management-sheqig.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMap
  ],
  styleUrls: ['./user-management-sheqig.component.scss'],
})
export class UserManagementSheqigComponent implements OnInit {
  currentStep = 1;
  clientForm: FormGroup;
  summary: any = {};
  mapUrl!: SafeResourceUrl;

  apiLoaded: boolean;
  center: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 };
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPosition: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 };
 

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.clientForm = this.fb.group({
      fullName: ['', Validators.required],
      contactInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      areaSize: ['', Validators.required],
      gpsLocation: [''],
      cleaningType: ['', Validators.required],
      frequency: ['', Validators.required],
      notes: [''],
      attachments: ['']
    });
    this.apiLoaded = false
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      fullName: ['', Validators.required],
      contactInfo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      areaSize: ['', Validators.required],
      gpsLocation: [''],
      cleaningType: ['', Validators.required],
      frequency: ['', Validators.required],
      notes: [''],
      attachments: ['']
    });
  } // Closing curly brace for ngOnInit

  nextStep() {
    if (this.currentStep === 1 && this.clientForm.get('fullName')?.valid && this.clientForm.get('contactInfo')?.valid && this.clientForm.get('email')?.valid && this.clientForm.get('phoneNumber')?.valid) {
      this.currentStep = 2;
    }
    else if (this.currentStep === 2 && this.clientForm.get('address')?.valid && this.clientForm.get('areaSize')?.valid) {
      this.currentStep = 3;
    }
    else {
      Object.values(this.clientForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


  onSubmit() {
    if (this.clientForm.valid) {
      console.log('Form submitted:', this.clientForm.value);
      // Add your form submission logic here
    } else {
      // Trigger validation on all form controls
      Object.values(this.clientForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}