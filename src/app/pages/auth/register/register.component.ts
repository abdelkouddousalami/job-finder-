import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-split">
        <div class="auth-form-panel" [class.slide-out]="currentSlide !== 0">
          <div class="form-container">
            <div class="form-header">
              <h1 class="form-title">Join Us</h1>
              <p class="form-subtitle">Create your account and start exploring</p>
            </div>
            <div *ngIf="errorMessage" class="error-banner"><span class="error-text">{{ errorMessage }}</span><button class="error-close" (click)="errorMessage = ''">&times;</button></div>
            <div *ngIf="successMessage" class="success-banner"><span class="success-text">{{ successMessage }}</span></div>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-input" formControlName="lastName" placeholder="Doe" [class.error]="submitted && f['lastName'].errors" />
                  <div class="form-error" *ngIf="submitted && f['lastName'].errors?.['required']">Last name required</div>
                  <div class="form-error" *ngIf="submitted && f['lastName'].errors?.['minlength']">Min 2 chars</div>
                </div>
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-input" formControlName="firstName" placeholder="John" [class.error]="submitted && f['firstName'].errors" />
                  <div class="form-error" *ngIf="submitted && f['firstName'].errors?.['required']">First name required</div>
                  <div class="form-error" *ngIf="submitted && f['firstName'].errors?.['minlength']">Min 2 chars</div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" formControlName="email" placeholder="your@email.com" [class.error]="submitted && f['email'].errors" />
                <div class="form-error" *ngIf="submitted && f['email'].errors?.['required']">Email required</div>
                <div class="form-error" *ngIf="submitted && f['email'].errors?.['email']">Invalid email</div>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-input" formControlName="password" placeholder="••••••••" [class.error]="submitted && f['password'].errors" />
                <div class="form-error" *ngIf="submitted && f['password'].errors?.['required']">Password required</div>
                <div class="form-error" *ngIf="submitted && f['password'].errors?.['minlength']">Min 6 chars</div>
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input type="password" class="form-input" formControlName="confirmPassword" placeholder="••••••••" [class.error]="submitted && f['confirmPassword'].errors" />
                <div class="form-error" *ngIf="submitted && f['confirmPassword'].errors?.['required']">Confirmation required</div>
                <div class="form-error" *ngIf="submitted && f['confirmPassword'].errors?.['passwordMismatch']">Passwords don't match</div>
              </div>
              <button type="submit" class="submit-btn" [disabled]="loading">
                <span *ngIf="loading" class="btn-loader"></span>
                <span *ngIf="loading">Creating...</span>
                <span *ngIf="!loading">Create Account</span>
                <span *ngIf="!loading" class="btn-arrow">→</span>
              </button>
              <div class="form-footer"><p class="footer-text">Already have an account? <a routerLink="/auth/login" class="footer-link">Sign in</a></p></div>
            </form>
          </div>
        </div>
        <div class="auth-visual-panel" [class.slide-in]="currentSlide !== 0">
          <div class="visual-content">
            <div class="slide-indicator">
              <span class="indicator-dot" [class.active]="currentSlide === 0" (click)="currentSlide = 0"></span>
              <span class="indicator-dot" [class.active]="currentSlide === 1" (click)="currentSlide = 1"></span>
              <span class="indicator-dot" [class.active]="currentSlide === 2" (click)="currentSlide = 2"></span>
            </div>
            <div class="slides-wrapper">
              <div class="slide" [class.active]="currentSlide === 0">
                <div class="slide-content"><h2 class="slide-title">Start Your Journey</h2><p class="slide-text">Join professionals who trust JobFinder.</p><div class="slide-decoration"></div></div>
              </div>
              <div class="slide" [class.active]="currentSlide === 1">
                <div class="slide-content"><h2 class="slide-title">Personalized Experience</h2><p class="slide-text">Get job recommendations for you.</p><div class="slide-decoration"></div></div>
              </div>
              <div class="slide" [class.active]="currentSlide === 2">
                <div class="slide-content"><h2 class="slide-title">Career Success</h2><p class="slide-text">Track your progress milestones.</p><div class="slide-decoration"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#000;padding:2rem}
    .auth-split{display:grid;grid-template-columns:1fr 1fr;max-width:1200px;width:100%;background:#000;border:1px solid #222;overflow:hidden;min-height:600px}
    .auth-form-panel{background:#000;padding:4rem;display:flex;align-items:center;justify-content:center;transition:transform .6s cubic-bezier(.4,0,.2,1);order:1}
    .auth-form-panel.slide-out{transform:translateX(100%)}
    .auth-visual-panel{background:#fff;color:#000;padding:4rem;display:flex;align-items:center;justify-content:center;position:relative;transition:transform .6s cubic-bezier(.4,0,.2,1);order:2}
    .auth-visual-panel.slide-in{transform:translateX(100%)}
    .visual-content{max-width:500px;position:relative}
    .slide-indicator{position:absolute;top:-2rem;left:0;display:flex;gap:.5rem;z-index:10}
    .indicator-dot{width:8px;height:8px;background:rgba(0,0,0,.2);cursor:pointer;transition:all .3s}
    .indicator-dot.active{background:#000;width:24px}
    .slides-wrapper{position:relative;width:100%;height:400px}
    .slide{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transform:translateX(50px);transition:all .6s cubic-bezier(.4,0,.2,1);pointer-events:none}
    .slide.active{opacity:1;transform:translateX(0);pointer-events:auto}
    .slide-title{font-size:3rem;font-weight:900;line-height:1.1;margin-bottom:1.5rem;letter-spacing:-1px}
    .slide-text{font-size:1.25rem;line-height:1.6;color:#666;margin-bottom:2rem}
    .slide-decoration{width:100px;height:4px;background:#000;animation:dExp 1s cubic-bezier(.4,0,.2,1) .3s backwards}
    @keyframes dExp{from{width:0;opacity:0}to{width:100px;opacity:1}}
    .form-container{max-width:400px;width:100%}
    .form-header{margin-bottom:3rem}
    .form-title{font-size:2.5rem;font-weight:900;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}
    .form-subtitle{font-size:1rem;color:#666;letter-spacing:.5px}
    .error-banner,.success-banner{padding:1rem;margin-bottom:2rem;animation:eSlide .3s}
    .error-banner{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center}
    .success-banner{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2)}
    @keyframes eSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
    .error-text,.success-text{color:#fff;font-size:.875rem}
    .error-close{background:0 0;border:none;color:#fff;font-size:1.5rem;cursor:pointer;padding:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center;transition:opacity .2s}
    .error-close:hover{opacity:.7}
    .register-form{animation:fFade .8s cubic-bezier(.4,0,.2,1) .2s backwards}
    @keyframes fFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:0}
    .form-group{margin-bottom:1.5rem}
    .form-label{display:block;font-size:.875rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#fff;margin-bottom:.5rem}
    .form-input{width:100%;padding:1rem;background:0 0;border:1px solid #333;color:#fff;font-size:1rem;transition:all .3s}
    .form-input::placeholder{color:#666}
    .form-input:focus{outline:0;border-color:#fff;background:rgba(255,255,255,.02)}
    .form-input.error{border-color:rgba(255,255,255,.3)}
    .form-error{display:block;color:#999;font-size:.75rem;margin-top:.25rem;letter-spacing:.5px}
    .submit-btn{width:100%;padding:1rem;background:#fff;color:#000;border:none;font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .3s cubic-bezier(.4,0,.2,1);margin-top:2rem;position:relative;overflow:hidden}
    .submit-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(0,0,0,.1),transparent);transition:left .5s}
    .submit-btn:hover:not(:disabled)::before{left:100%}
    .submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,255,255,.1)}
    .submit-btn:disabled{opacity:.5;cursor:not-allowed}
    .btn-loader{width:16px;height:16px;border:2px solid #000;border-top-color:transparent;border-radius:50%;animation:bSpin .6s linear infinite}
    @keyframes bSpin{to{transform:rotate(360deg)}}
    .btn-arrow{transition:transform .3s}
    .submit-btn:hover:not(:disabled) .btn-arrow{transform:translateX(5px)}
    .form-footer{margin-top:2rem;text-align:center}
    .footer-text{color:#666;font-size:.875rem}
    .footer-link{color:#fff;text-decoration:none;font-weight:600;margin-left:.25rem;position:relative}
    .footer-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#fff;transition:width .3s}
    .footer-link:hover::after{width:100%}
    @media (max-width:992px){.auth-split{grid-template-columns:1fr}.auth-visual-panel{display:none}.auth-form-panel{padding:2rem;order:1}.form-row{grid-template-columns:1fr}}
  `]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  currentSlide = 0;
  private slideInterval: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get f() { return this.registerForm.controls; }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    if (password && confirm && password.value !== confirm.value) {
      confirm.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { lastName, firstName, email, password } = this.registerForm.value;

    this.authService.checkEmailExists(email).subscribe({
      next: (exists) => {
        if (exists) {
          this.loading = false;
          this.errorMessage = 'Email already in use';
          return;
        }
        this.authService.register({ lastName, firstName, email, password }).subscribe({
          next: () => {
            this.loading = false;
            this.successMessage = 'Success! Redirecting...';
            setTimeout(() => this.router.navigate(['/auth/login']), 1500);
          },
          error: () => {
            this.loading = false;
            this.errorMessage = 'Registration error';
          }
        });
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Server error';
      }
    });
  }
}
