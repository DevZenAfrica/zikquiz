import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../core/_services/authentication.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  title: string = "score.title";
  object: any = {};
  details: any;
  current_user: any;
  notScrolly = true;
  date: any = {};
  total_tab: number = null;

  constructor(private _auth: AuthenticationService) {
  }

  ngOnInit(): void {
    this.current_user = this._auth.currentUserValue;

    this._auth.api.loadAppConfig().then((data: any) => {
      this.total_tab = data.total_week;
      this.load_data();

      setTimeout(() => {
        this._auth.api.active_tabs();
      }, 230);
    });
  }

  private get_week(week = 0) {
    this.date = this._auth.api.current_week(week);
  }

  load_data(week = 0) {
    this.object = {};
    this.get_week(week);
    this._auth.api.is_loader(true);
    this._auth.api.request('data@get', 'scores', {week})
      .subscribe(data => {

        this.object = Object.assign({}, data);

        this._auth.api.is_loader(false);

        /*if (this.details) {
          const last_list = this.details.data;
          this.details = {...data.details};
          this.details.data = [...last_list, ...data.details.data];
        } else
          this.details = data.details;
        this.notScrolly = true;

        delete this.object.details;
        console.log(this.object)*/
      }, error => {
        this._auth.api.is_loader(false);
      })
  }

  onScroll() {
    if (this.details && this.notScrolly) {
      const index = this.details.current_page + 1;
      if (index <= this.details.last_page) {
        this.notScrolly = false;
        this.load_data(index)
      }
    }
  }
}
