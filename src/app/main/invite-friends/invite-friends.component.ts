import { environment } from './../../../environments/environment';
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../core/_services/authentication.service";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-invite-friends",
  templateUrl: "./invite-friends.component.html",
  styleUrls: ["./invite-friends.component.scss"],
})
export class InviteFriendsComponent implements OnInit, AfterViewInit {
  title: string = "invite_friend.title";
  object: any = {};
  object_form: any = {};
  current_user: any;

  inviteForm = this.fb.group({
    phone_number: ["", [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    full_name: ["", [Validators.required, Validators.minLength(4)]],
    is_whatsapp: [false],
  });

  get phoneNumberR() {
    return this.inviteForm.get("phone_number");
  }

  get fullName() {
    return this.inviteForm.get("full_name");
  }

  constructor(private _auth: AuthenticationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.load_data();

    this.current_user = this._auth.currentUserValue;
  }

  number_change(
    phone: AbstractControl = this.phoneNumberR,
    length: number = 9
  ) {
    if (phone.value) {
      const val = phone.value.toString();
      if (val.length > length) {
        phone.patchValue(+val.slice(0, -1));
      }
    }
  }

  ngAfterViewInit(): void {
    this._auth.api.active_tabs();
    this._auth.api.active_input();
  }

  load_data() {
    this._auth.api.is_loader(true);
    this._auth.api.request("auth@get", "friends").subscribe(
      (data) => {
        this.object = data;
        this._auth.api.is_loader(false);
      },
      (error) => {
        this._auth.api.is_loader(false);
      }
    );
  }

  save_data(form: FormGroup) {
    const log = form.value;
    if (form.valid) {
      this._auth.api.is_loader(true);
      this._auth.api
        .request("auth@post", "invite", {
          phone: log.phone_number,
          full_name: log.full_name,
          is_whatsapp: log.is_whatsapp,
        })
        .subscribe(
          (data) => {
            this._auth.api.toast.success(data.message);
            this._auth.api.is_loader(false);
            this.load_data();
            this.object_form = {};
            form.reset();
          },
          (err) => {
            this._auth.api.is_loader(false);

            if (err.error.message)
              this._auth.api.toast.error(err.error.message);
            console.log(err);
          }
        );
    }
  }
}
