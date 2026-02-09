import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-split">
        <div class="auth-visual-panel" [class.slide-out]="currentSlide !== 0">
          <div class="visual-content">
            <div class="slide-indicator">
              <span class="indicator-dot" [class.active]="currentSlide === 0" (click)="currentSlide = 0"></span>
              <span class="indicator-dot" [class.active]="currentSlide === 1" (click)="currentSlide = 1"></span>
              <span class="indicator-dot" [class.active]="currentSlide === 2" (click)="currentSlide = 2"></span>
            </div>
            <div class="slides-wrapper">
              <div class="slide" [class.active]="currentSlide === 0">
                <div class="slide-content">
                  <h2 class="slide-title">Discover Your Dream Job</h2>
                  <p class="slide-text">Access thousands of job opportunities from top companies worldwide.</p>
                  <div class="slide-decoration"></div>
                </div>
              </div>
              <div class="slide" [class.active]="currentSlide === 1">
                <div class="slide-content">
                  <h2 class="slide-title">Track Your Applications</h2>
                  <p class="slide-text">Manage all your job applications in one place with powerful tools.</p>
                  <div class="slide-decoration"></div>
                </div>
              </div>
              <div class="slide" [class.active]="currentSlide === 2">
                <div class="slide-content">
                  <h2 class="slide-title">Build Your Career</h2>
                  <p class="slide-text">Join our community and take the next step in your professional journey.</p>
                  <div class="slide-decoration"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="auth-form-panel" [class.slide-in]="currentSlide !== 0">
          <div class="form-container">
            <div class="form-header">
              <h1 class="form-title">Welcome Back</h1>
              <p class="form-subtitle">Sign in to continue your job search</p>
            </div>
            <div *ngIf="errorMessage" class="error-banner">
              <span class="error-text">{{ errorMessage }}</span>
              <button class="error-close" (click)="errorMessage = ''">&times;</button>
            </div>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" formControlName="email" placeholder="your@email.com" [class.error]="submitted && f['email'].errors" />
                <div class="form-error" *ngIf="submitted && f['email'].errors?.['required']">Email is required</div>
                <div class="form-error" *ngIf="submitted && f['email'].errors?.['email']">Invalid email format</div>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-input" formControlName="password" placeholder="••••••••" [class.error]="submitted && f['password'].errors" />
                <div class="form-error" *ngIf="submitted && f['password'].errors?.['required']">Password is required</div>
              </div>
              <button type="submit" class="submit-btn" [disabled]="loading">
                <span *ngIf="loading" class="btn-loader"></span>
                <span *ngIf="loading">Signing In...</span>
                <span *ngIf="!loading">Sign In</span>
                <span *ngIf="!loading" class="btn-arrow">→</span>
              </button>
              <div class="form-footer">
                <p class="footer-text">Don't have an account? <a routerLink="/auth/register" class="footer-link">Create one</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#000;padding:2rem}
    .auth-split{display:grid;grid-template-columns:1fr 1fr;max-width:1200px;width:100%;background:#000;border:1px solid #222;overflow:hidden;min-height:600px}
    .auth-visual-panel{background:#fff;color:#000;padding:4rem;display:flex;align-items:center;justify-content:center;position:relative;transition:transform .6s cubic-bezier(.4,0,.2,1)}
    .auth-visual-panel.slide-out{transform:translateX(-100%)}
    .visual-content{max-width:500px;position:relative}
    .slide-indicator{position:absolute;top:-2rem;left:0;display:flex;gap:.5rem;z-index:10}
    .indicator-dot{width:8px;height:8px;background:rgba(0,0,0,.2);cursor:pointer;transition:all .3s}
    .indicator-dot.active{background:#000;width:24px}
    .slides-wrapper{position:relative;width:100%;height:400px}
    .slide{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transform:translateX(50px);transition:all .6s cubic-bezier(.4,0,.2,1);pointer-events:none}
    .slide.active{opacity:1;transform:translateX(0);pointer-events:auto}
    .slide-title{font-size:3rem;font-weight:900;line-height:1.1;margin-bottom:1.5rem;letter-spacing:-1px}
    .slide-text{font-size:1.25rem;line-height:1.6;color:#666;margin-bottom:2rem}
    .slide-decoration{width:100px;height:4px;background:#000;animation:decorationExpand 1s cubic-bezier(.4,0,.2,1) .3s backwards}
    @keyframes decorationExpand{from{width:0;opacity:0}to{width:100px;opacity:1}}
    .auth-form-panel{background:#000;padding:4rem;display:flex;align-items:center;justify-content:center;transition:transform .6s cubic-bezier(.4,0,.2,1)}
    .auth-form-panel.slide-in{transform:translateX(-100%)}
    .form-container{max-width:400px;width:100%}
    .form-header{margin-bottom:3rem}
    .form-title{font-size:2.5rem;font-weight:900;color:#fff;margin-bottom:.5rem;letter-spacing:-1px}
    .form-subtitle{font-size:1rem;color:#666;letter-spacing:.5px}
    .error-banner{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:1rem;margin-bottom:2rem;display:flex;justify-content:space-between;align-items:center;animation:errorSlide .3s}
    @keyframes errorSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
    .error-text{color:#fff;font-size:.875rem}
    .error-close{background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;padding:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center;transition:opacity .2s}
    .error-close:hover{opacity:.7}
    .login-form{animation:formFadeIn .8s cubic-bezier(.4,0,.2,1) .2s backwards}
    @keyframes formFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .form-group{margin-bottom:1.5rem}
    .form-label{display:block;font-size:.875rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#fff;margin-bottom:.5rem}
    .form-input{width:100%;padding:1rem;background:transparent;border:1px solid #333;color:#fff;font-size:1rem;transition:all .3s}
    .form-input::placeholder{color:#666}
    .form-input:focus{outline:none;border-color:#fff;background:rgba(255,255,255,.02)}
    .form-input.error{border-color:rgba(255,255,255,.3)}
    .form-error{display:block;color:#999;font-size:.75rem;margin-top:.25rem;letter-spacing:.5px}
    .submit-btn{width:100%;padding:1rem;background:#fff;color:#000;border:none;font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;transition:all .3s cubic-bezier(.4,0,.2,1);margin-top:2rem;position:relative;overflow:hidden}
    .submit-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(0,0,0,.1),transparent);transition:left .5s}
    .submit-btn:hover:not(:disabled)::before{left:100%}
    .submit-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,255,255,.1)}
    .submit-btn:disabled{opacity:.5;cursor:not-allowed}
    .btn-loader{width:16px;height:16px;border:2px solid #000;border-top-color:transparent;border-radius:50%;animation:btnSpin .6s linear infinite}
    @keyframes btnSpin{to{transform:rotate(360deg)}}
    .btn-arrow{transition:transform .3s}
    .submit-btn:hover:not(:disabled) .btn-arrow{transform:translateX(5px)}
    .form-footer{margin-top:2rem;text-align:center}
    .footer-text{color:#666;font-size:.875rem}
    .footer-link{color:#fff;text-decoration:none;font-weight:600;margin-left:.25rem;position:relative}
    .footer-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#fff;transition:width .3s}
    .footer-link:hover::after{width:100%}
    @media (max-width:992px){.auth-split{grid-template-columns:1fr}.auth-visual-panel{display:none}.auth-form-panel{padding:2rem}}
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  currentSlide = 0;
  private slideInterval: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

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
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user) {
          this.router.navigate(['/search']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Server connection error';
      }
    });
  }
}
