import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/_services/authentication.service";

@Component({
  selector: 'app-how-it-work',
  templateUrl: './how-it-work.component.html',
  styleUrls: ['./how-it-work.component.scss']
})
export class HowItWorkComponent implements OnInit {

  current_user: any;
  title: string = "menu.how_it_work";
  object: any = {};

  constructor(private _auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.current_user = this._auth.currentUserValue;
    this.init_data();
  }

  init_data() {
    this._auth.api.is_loader(true);
    this._auth.api.request('data@get', 'get_content', {data_key: 'hiw'})
      .subscribe((data: any) => {
        this.object.data = data;
        this._auth.api.is_loader(false);
      }, error => {
        console.error(error);
        this._auth.api.is_loader(false);
      })
  }
}
