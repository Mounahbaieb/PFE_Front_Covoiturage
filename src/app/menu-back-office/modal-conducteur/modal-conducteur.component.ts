import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadService } from 'src/Service/upload.service';
import { ConducteurService } from 'src/Service/conducteur.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-conducteur',
  templateUrl: './modal-conducteur.component.html',
  styleUrls: ['./modal-conducteur.component.css']
})
export class ModalConducteurComponent implements OnInit {
  form!: FormGroup;
  driverFiles: File[] = [];
  imageUrl: string = "";
  verifEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalConducteurComponent>,
    private fb: FormBuilder,
    private upload: UploadService,
    private conducteurService: ConducteurService,
    private snackBar: MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.verifEdit = true;
      console.log(this.data);
      this.initForm2();
    } else {
      this.verifEdit = false;
      this.initForm();
    }
  }
  initForm(): void {
    this.form = new FormGroup({
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      numDriver: new FormControl(null, [Validators.required]),
      photoDriver: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),


      //SourcePDF: new FormControl(null,),
      //createDate:new FormControl(null,[Validators.required]),
    });
  }
  initForm2(): void {
    this.form = new FormGroup({
      nom: new FormControl(this.data?.nom, [Validators.required]),
      prenom: new FormControl(this.data?.prenom, [Validators.required]),
      numDriver: new FormControl(this.data?.numDriver, [Validators.required]),
      photoDriver: new FormControl(this.data?.photoDriver, [Validators.required]),
      gender: new FormControl(this.data?.gender, [Validators.required]),
      email: new FormControl(this.data?.email, [Validators.required]),
      password: new FormControl(this.data?.password, [Validators.required]),



      //SourcePDF: new FormControl(null,),

      //createDate:new FormControl(null,[Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onSelectDriverImage(event: any): void {
    this.driverFiles.push(...event.addedFiles);
    this.uploadDriverImage();
  }

  onRemoveDriverImage(event: any): void {
    this.driverFiles.splice(this.driverFiles.indexOf(event), 1);
  }

  uploadDriverImage(): void {
    if (!this.driverFiles[0]) {
      alert("Please upload an image.");
      return;
    }
    const file_data = this.driverFiles[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'laravel');
    data.append('cloud_name', 'dojutziz3');
    this.upload.uploadImage(data).subscribe((res: any) => {
      this.imageUrl = res.url;
      this.form.patchValue({ photoDriver: res.url });
    });
  }
  save() {
    if (!this.verifEdit) {
      this.dialogRef.close(this.form.value);
      this.conducteurService.createConducteur(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/ListConducteur').then(()=>{
          location.reload()
        })       });
    } else {
      this.dialogRef.close(this.form.value);
      this.conducteurService.editConducteur(this.form.value, this.data?.id).subscribe(() => {
        this.router.navigateByUrl('/ListConducteur').then(()=>{
          location.reload()
        })      });
    }
  }
  
}
