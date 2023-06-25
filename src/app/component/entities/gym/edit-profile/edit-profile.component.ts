import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/model/owner';
import { OwnerService } from 'src/app/service/owner.service';
import { UserDataService } from 'src/app/service/user-data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  hideCode = true;
  hidePassword = true;
  owner: Owner = new Owner();
  idOwner: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private route: ActivatedRoute,
    private oS: OwnerService,
    private uDS: UserDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.uDS.getUserData().subscribe((userData: any) => {
      this.idOwner = userData.idUser;
      this.loadOwnerData();
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthdate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      cellphone: new FormControl('', [Validators.required]),
    });
  }

  loadOwnerData() {
    this.oS.get(this.idOwner).subscribe(owner => {
      this.owner = owner;
      this.patchFormValues();
    });
  }

  patchFormValues() {
    this.form.patchValue({
      name: this.owner.name,
      lastname: this.owner.lastname,
      email: this.owner.email,
      password: this.owner.password,
      birthdate: this.owner.birthDate,
      gender: this.owner.gender,
      cellphone: this.owner.cellphone
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateOwner() {
    if (this.form.valid) {
      const updatedOwner: Owner = {
        ...this.owner,
        ...this.form.value
      };

      this.oS.update(updatedOwner).subscribe(() => {
        this.closeDialog();
        this.router.navigate(['/dashboard/gyms']);
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
