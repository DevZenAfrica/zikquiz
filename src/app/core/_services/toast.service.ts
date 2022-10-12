import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _toastr: ToastrService) {
  }

  success(content, title = null, options = {}) {
    const base_op = {
      timeOut: 5000,
      progressBar: true
    };
    return this._toastr.success(content, title, {...base_op, ...options});
  }

  error(content, title = null, options = {}) {
    const base_op = {
      autoDismiss: false,
      tapToDismiss: true,
      enableHtml: true,
      closeButton: true,
      timeOut: 2000,
      disableTimeOut: true,
      extendedTimeOut: 2000,
      progressBar: true
    };
    return this._toastr.error(content, title, {...base_op, ...options});
  }

  info(content, title = null, options = {}) {
    const base_op = {
      timeOut: 5000,
      progressBar: true
    };
    return this._toastr.info(content, title, {...base_op, ...options});
  }

  badRequest(bad_request: any) {
    let content = `<ol>`;
    if (bad_request.errors && (typeof (bad_request.errors) === 'object')) {
      const errors = bad_request.errors;
      for (let key in errors) {
        errors[key].forEach(it => {
          content += `<li>${`<strong>` + key + ` : </strong>` + it}</li>`;
        });
      }
    }
    content += `</ol>`;

    return this.error(content, bad_request.message || 'Error for bad request');
  }
}
