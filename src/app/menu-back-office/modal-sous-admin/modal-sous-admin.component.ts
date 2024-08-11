import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SousAdminService } from 'src/Service/sous-admin.service';

@Component({
  selector: 'app-modal-sous-admin',
  templateUrl: './modal-sous-admin.component.html',
  styleUrls: ['./modal-sous-admin.component.css']
})
export class ModalSousAdminComponent  implements OnInit{

  form!: FormGroup;
  
  verifEdit: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalSousAdminComponent>,
    private fb: FormBuilder,
    private sousAdminService: SousAdminService,
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
      email: new FormControl(this.data?.email, [Validators.required]),
      password: new FormControl(this.data?.password, [Validators.required]),



      //SourcePDF: new FormControl(null,),

      //createDate:new FormControl(null,[Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  
  save() {
    if (!this.verifEdit) {
      this.dialogRef.close(this.form.value);
      this.sousAdminService.createSousAdmin(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/ListSousAdmin').then(()=>{
          location.reload()
        })       });
    } else {
      this.dialogRef.close(this.form.value);
      this.sousAdminService.editSousAdmin(this.form.value, this.data?.id).subscribe(() => {
        this.router.navigateByUrl('/ListSousAdmin').then(()=>{
          location.reload()
        })      });
    }
  }
  
}
