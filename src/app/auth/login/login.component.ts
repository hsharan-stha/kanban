import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {LoginService} from '@services/auth/login/login.service';
import {ButtonSubmitService} from '@shared/services/button-submit/button-submit.service';
import {ShowHidePasswordComponent} from '@shared/templates/show-hide-password/show-hide-password.component';
import {catchError, concatMap, map} from 'rxjs';
import {LocalStorageService} from '@shared/services/local-storage/local-storage.service';
import {InitializerService} from '@shared/services/initializer/initializer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ShowHidePasswordComponent,
    RouterModule,
  ],
})
export class LoginComponent implements OnInit {
  public formStructure: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService,
    private buttonSubmitService: ButtonSubmitService,
    private localStorageService: LocalStorageService,
    private initializerService: InitializerService,
  ) {
  }

  ngOnInit(): void {
    this.formInitialize();
  }

  public onFormSubmit(): void {
    this.buttonSubmitService.setButtonSubmit();
    if (this.formStructure.invalid) {
      this.formStructure.markAllAsTouched();
      return;
    }

    this.service
      .userLogin(this.formStructure.getRawValue())
      .pipe(
        concatMap((res: any) => {
          this.localStorageService.setAccessToken(res['accessToken']);
          this.localStorageService.setRefreshToken(res['refreshToken']);
          return this.initializerService.initializer().then()
        }),
        map(async () => {
          await this.router.navigate(['/featured']);
        }),
        catchError(async () => {
          await this.router.navigate(['/auth']);
        })
      )
      .subscribe();
  }

  private formInitialize(): void {
    this.formStructure = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [''],
    });
  }
}
