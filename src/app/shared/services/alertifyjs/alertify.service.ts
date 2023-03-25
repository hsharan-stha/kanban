import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor(private toaster: ToastrService) {
    this.setTopRight();
  }

  confirm(
    message: string,
    header: string = 'UPDATE' || 'DELETE',
    okCallback: () => any
  ) {
    alertify
      .confirm(message, function (e: any) {
        if (e) {
          okCallback();
        } else {
        }
      })
      .setHeader(`<em class="text-danger"><b>${header}</b></em> `);
  }

  setBottomLeftPosition() {
    this.toaster.toastrConfig.positionClass = 'toast-bottom-left';
  }

  setBottomRightPosition() {
    this.toaster.toastrConfig.positionClass = 'toast-bottom-right';
  }

  setTopRight() {
    this.toaster.toastrConfig.positionClass = 'toast-top-right';
  }

  success(message: string) {
    this.toaster.success(message);
  }

  error(message: string) {
    this.toaster.error(message);
  }

  warning(message: string) {
    this.toaster.warning(message);
  }

  message(message: string) {
    this.toaster.info(message);
  }

  clear(toastId?: number) {
    this.toaster.clear(toastId);
  }
}
