import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/_services/authentication.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-suggest-question',
  templateUrl: './suggest-question.component.html',
  styleUrls: ['./suggest-question.component.scss']
})
export class SuggestQuestionComponent implements OnInit, AfterViewInit {

  title: string = "suggest_question.title";
  object: any = {};
  object_form: any = {};
  current_user: any;
  suggestForm = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(5)]],
    response: ['', [Validators.minLength(1)]],
  });

  constructor(private _auth: AuthenticationService, private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.load_data();

    this.current_user = this._auth.currentUserValue;
  }

  ngAfterViewInit(): void {
    this._auth.api.active_tabs();
  }

  load_data() {
    this._auth.api.is_loader(true);
    this._auth.api.request('data@get', 'propositions')
      .subscribe(data => {
        this.object = data;
        this._auth.api.is_loader(false);
      }, error => {
        this._auth.api.is_loader(false);
      })
  }

  save_data(form: FormGroup) {
    const log = form.value;
    this._auth.api.is_loader(true);
    if (form.valid) {
      this._auth.api.request('data@post', 'save_proposition',
        {question: log.question, response: log.response})
        .subscribe((data) => {

          this._auth.api.toast.success(data.message);
          this._auth.api.is_loader(false);
          this.load_data();
          this.object_form = {};
          form.reset();
        }, err => {
          this._auth.api.is_loader(false);

          if (err.error.message)
            this._auth.api.toast.error(err.error.message);
          console.log(err);
        });
    }
  }
}
