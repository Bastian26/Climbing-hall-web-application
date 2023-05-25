import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Member } from '../../../../models/member';
import { addMember } from '../../../../store/actions/members.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/model/app-state-model';

@Component({
  selector: 'app-add-member-form',
  templateUrl: './add-member-form.component.html',
  styleUrls: ['./add-member-form.component.scss'],
})
export class AddMemberFormComponent implements OnInit {
  addMemberForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.addMemberForm = new FormGroup({
      firstName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      lastName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      addressDto: new FormGroup({
        street: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        }),
        houseNumber: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(5),
          ],
        }),
        postCode: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
          ],
        }),
      }),
    });
  }

  public isDisabled(): boolean {
    return !(
      this.addMemberForm.valid &&
      (this.addMemberForm.touched || this.addMemberForm.dirty)
    );
  }

  onSubmit() {
    if (this.addMemberForm.valid) {
      const member: Member = {
        firstName: this.addMemberForm.get('firstName')?.value,
        lastName: this.addMemberForm.get('lastName')?.value,
        addressDto: {
          street: this.addMemberForm.get('addressDto.street')?.value,
          houseNumber: this.addMemberForm.get('addressDto.houseNumber')?.value,
          postCode: this.addMemberForm.get('addressDto.postCode')?.value,
        },
      };

      this.store.dispatch(addMember({ member }));
    }
  }
}
