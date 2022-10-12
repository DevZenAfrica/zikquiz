import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {ToastService} from "./toast.service";
import * as moment from 'moment';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = `api/`;
  private apiR: Array<string> = [];
  private defaultDomain: string = environment.api_url;//'http://smart-agent.local/'
  mobile: string = '';
  public data_only: any = {};
  private loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subject_test = new Subject<boolean>();
  public current_lang: any = {};
  public current_lang_key = 'fr';
  public list_country: Array<any> = [];
  public recaptcha_site_key = environment.recaptcha_site_key;

  constructor(private _http: HttpClient, public toast: ToastService) {
    this.check_data();
  }

  clearTest() {
    this.subject_test.next(true);
  }

  getStatusTest(): Observable<boolean> {
    return this.subject_test.asObservable();
  }

  is_loader(status: boolean) {
    setTimeout(() => {
      this.loader.next(status);
    });
  }

  getStatusLoader(): Observable<boolean> {
    return this.loader.asObservable();
  }

  check_data() {
    let data: any = localStorage.getItem('data_storage');
    if (data) {
      data = JSON.parse(data);
      this.data_only = data;
    }
  }

  loadAppConfig() {
    return new Promise((resolve, reject) => {
      this.request('others@get', 'configs.json').subscribe(data => {
        resolve(data);
      }, reject);
    })
  }

  loadAppConfigC() {
    return new Promise((resolve, reject) => {
      this.request('others@get', 'world_fr.json').subscribe(data => {
        this.list_country = data;
        console.log(data);
        resolve(data);
      }, reject);
    })
  }

  register(key: string, resource: Array<string>) {
    if ((typeof resource[1] !== 'undefined') && (typeof resource[1] === 'string')) {
      this.apiR[key] = resource[1] + resource[0];
    } else {
      this.apiR[key] = this.defaultDomain + this.baseUrl + resource[0];
    }
  }

  request(action: string, subPath?: string, data?: any): Observable<any> {
    const actionParts = action.split('@'),
      resource = actionParts[0],
      method = actionParts[1].toLowerCase();

    if (!resource || !method) {
      return throwError('apiResource.request requires correct action parameter (resourceName@methodName)');
    }

    const parentLink = this.apiR[resource],
      apiObject = (parentLink || '') + `${subPath ? (parentLink.substring(parentLink.length - 1) !== '/' ? '/' : '') + subPath : ''}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: ['post', 'put'].indexOf(method) > -1 ? null : data as HttpParams,
      body: ['post', 'put'].indexOf(method) > -1 ? data : null
    };

    return this._http.request(method, apiObject, httpOptions);
  }

  getOptionsRangeDate(fromDate: Date = (new Date()), toDate: Date = (new Date())) {
    return {
      presets: this.setupPresets(),
      format: 'mediumDate',
      range: {fromDate, toDate},
      applyLabel: 'Submit',
      calendarOverlayConfig: {
        shouldCloseOnBackdropClick: false,
        hasBackDrop: false
      }
      // cancelLabel: "Cancel",
      // excludeWeekends:true,
      // fromMinMax: {fromDate:fromMin, toDate:fromMax},
      // toMinMax: {fromDate:toMin, toDate:toMax}
    };
  }

  private setupPresets() {
    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    };

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7);
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    return [
      {key: 'yesterday', presetLabel: 'Yesterday', range: {fromDate: yesterday, toDate: today}},
      {key: 'last_7_days', presetLabel: 'Last 7 Days', range: {fromDate: minus7, toDate: today}},
      {key: 'last_30_days', presetLabel: 'Last 30 Days', range: {fromDate: minus30, toDate: today}},
      {key: 'this_month', presetLabel: 'This Month', range: {fromDate: currMonthStart, toDate: currMonthEnd}},
      {key: 'last_month', presetLabel: 'Last Month', range: {fromDate: lastMonthStart, toDate: lastMonthEnd}}
    ];
  }

  current_montDate() {
    return this.setupPresets().find(it => it.key === 'this_month').range;
  }

  current_week(week = 0) {
    const m = moment().subtract(week, "week");
    m.locale(this.current_lang_key);

    const start = m.startOf('week').format('DD/MM/YYYY'),
      end = m.endOf('week').format('DD/MM/YYYY');

    return {end, start};
  }

  active_tabs() {
    var tab = $('.tab-controls');

    function activate_tabs() {
      var tabTrigger = $('.tab-controls a');
      tab.each(function () {
        var tabItems = $(this).parent().find('.tab-controls').data('tab-items');
        var tabWidth = $(this).width();
        var tabActive = $(this).find('a[data-tab-active]');
        var tabID = $('#' + tabActive.data('tab'));
        var tabBg = $(this).data('tab-active');
        $(this).find('a[data-tab]').css("width", (100 / tabItems) + '%');
        tabActive.addClass(tabBg);
        tabActive.addClass('color-white');
        tabID.slideDown(0);
      });
      tabTrigger.on('click', function () {
        var tabData = $(this).data('tab');
        var tabID = $('#' + tabData);
        var tabContent = $(this).parent().parent().find('.tab-content');
        var tabOrder = $(this).data('tab-order');
        var tabBg = $(this).parent().parent().find('.tab-controls').data('tab-active');
        $(this).parent().find(tabTrigger).removeClass(tabBg).removeClass('color-white');
        $(this).addClass(tabBg).addClass('color-white');
        $(this).parent().find('a').removeClass('no-click');
        $(this).addClass('no-click');
        tabContent.slideUp(250);
        tabID.slideDown(250);
      });

    }

    if (tab.length) {
      activate_tabs()
    }
  }

  active_input() {
    var emailValidator = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    var phoneValidator = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    var nameValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
    var passwordValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
    var urlValidator = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
    var textareaValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
    var validIcon = "<i class='fa fa-check color-green1-dark'></i>";
    var invalidIcon = "<i class='fa fa-exclamation-triangle color-red2-light'></i>";

    let input = $('.input-required input, .input-required select, .input-required textarea');

    input.on('focusin keyup', function () {
      var spanValue = $(this).parent().find('span').text();
      if ($(this).val() != spanValue && $(this).val() != "") {
        $(this).parent().find('span').addClass('input-style-1-active').removeClass('input-style-1-inactive');
      }
      if ($(this).val() === "") {
        $(this).parent().find('span').removeClass('input-style-1-inactive input-style-1-active');
      }
    });
    input.on('focusout', function () {
      var spanValue = $(this).parent().find('span').text();
      if ($(this).val() === "") {
        $(this).parent().find('span').removeClass('input-style-1-inactive input-style-1-active');
      }
      $(this).parent().find('span').addClass('input-style-1-inactive')
    });
    $('.input-required select').on('focusout', function () {
      var getValue = $(this)[0].value;
      if (getValue === "default") {
        $(this).parent().find('em').html(invalidIcon)
        $(this).parent().find('span').removeClass('input-style-1-inactive input-style-1-active');
      }
      if (getValue != "default") {
        $(this).parent().find('em').html(validIcon)
      }
    });
    $('.input-required input[type="email"]').on('focusout', function () {
      if (emailValidator.test($(this).val())) {
        $(this).parent().find('em').html(validIcon);
      } else {
        if ($(this).val() === "") {
          $(this).parent().find('em').html("(required)");
        } else {
          $(this).parent().find('em').html(invalidIcon);
        }
      }
    });
    $('.input-required input[type="tel"]').on('focusout', function () {
      if (phoneValidator.test($(this).val())) {
        $(this).parent().find('em').html(validIcon);
      } else {
        if ($(this).val() === "") {
          $(this).parent().find('em').html("(required)");
        } else {
          $(this).parent().find('em').html(invalidIcon);
        }
      }
    });
    $('.input-required input[type="password"]').on('focusout', function () {
      if (passwordValidator.test($(this).val())) {
        $(this).parent().find('em').html(validIcon);
      } else {
        if ($(this).val() === "") {
          $(this).parent().find('em').html("(required)");
        } else {
          $(this).parent().find('em').html(invalidIcon);
        }
      }
    });
    $('.input-required input[type="url"]').on('focusout', function () {
      if (urlValidator.test($(this).val())) {
        $(this).parent().find('em').html(validIcon);
      } else {
        if ($(this).val() === "") {
          $(this).parent().find('em').html("(required)");
        } else {
          $(this).parent().find('em').html(invalidIcon);
        }
      }
    });
    $('.input-required input[type="name"]').on('focusout', function () {
      if (nameValidator.test($(this).val())) {
        $(this).parent().find('em').html(validIcon);
      } else {
        if ($(this).val() === "") {
          $(this).parent().find('em').html("(required)");
        } else {
          $(this).parent().find('em').html(invalidIcon);
        }
      }
    });
    $('.input-required textarea').on('focusout', function () {
      if (textareaValidator.test($(this).val())) {
        $(this).parent().find('em').html(validIcon);
      } else {
        if ($(this).val() === "") {
          $(this).parent().find('em').html("(required)");
        } else {
          $(this).parent().find('em').html(invalidIcon);
        }
      }
    });
  }

  test_code() {

  }
}
