import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PassagerService } from 'src/Service/passager.service';
import { UploadService } from 'src/Service/upload.service';

@Component({
  selector: 'app-modal-passager',
  templateUrl: './modal-passager.component.html',
  styleUrls: ['./modal-passager.component.css']
})
export class ModalPassagerComponent {
  form!: FormGroup;
  passagerFiles: File[] = [];
  imageUrl: string = "";
  verifEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalPassagerComponent>,
    private fb: FormBuilder,
    private upload: UploadService,
    private passagerservice: PassagerService,
    private snackBar: MatSnackBar,
    private router : Router
  ) { }  
  ngOnInit(): void {
    if (this.data) {
      this.verifEdit = false;
      this.initForm();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      numTel: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),


      //SourcePDF: new FormControl(null,),
      //createDate:new FormControl(null,[Validators.required]),
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  onSelectPassagerImage(event: any): void {
    this.passagerFiles.push(...event.addedFiles);
    this.uploadPassagerImage();
  }

  onRemovePassagerImage(event: any): void {
    this.passagerFiles.splice(this.passagerFiles.indexOf(event), 1);
  }

  uploadPassagerImage(): void {
    if (!this.passagerFiles[0]) {
      alert("Please upload an image.");
      return;
    }
    const file_data = this.passagerFiles[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'laravel');
    data.append('cloud_name', 'dojutziz3');
    this.upload.uploadImage(data).subscribe((res: any) => {
      this.imageUrl = res.url;
      this.form.patchValue({ photo: res.url });
    });
  }
  save() {
    if (!this.verifEdit) {
      this.dialogRef.close(this.form.value);
      this.passagerservice.createPassager(this.form.value).subscribe((passager) => {
        // Retourner les détails du passager, y compris son ID
        this.dialogRef.close({ ...this.form.value, id: passager.id });
      });
    }
  }
}
