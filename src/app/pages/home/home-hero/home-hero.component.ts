import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero-section">
      <div class="hero-background">
        <div class="hero-grid"></div>
        <div class="hero-gradient"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span class="badge-text">Premium Job Search Platform</span>
        </div>
        
        <h1 class="hero-title">
          <span class="title-line">
            <span class="word">Find</span>
            <span class="word">Your</span>
          </span>
          <span class="title-line">
            <span class="word highlight">Dream</span>
            <span class="word">Career</span>
          </span>
        </h1>
        
        <p class="hero-description">
          <span class="desc-line">Discover thousands of international job opportunities,</span>
          <span class="desc-line">save your favorites, and track your applications seamlessly.</span>
        </p>
        
        <div class="hero-actions">
          <a routerLink="/search" class="hero-btn hero-btn-primary">
            <span class="btn-text">Explore Jobs</span>
            <span class="btn-arrow">→</span>
          </a>
          <a routerLink="/register" class="hero-btn hero-btn-secondary">
            <span class="btn-text">Get Started</span>
          </a>
        </div>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Active Jobs</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Companies</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Countries</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      position: relative;
      padding: 8rem 0 6rem;
      overflow: hidden;
    }
    
    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
    
    .hero-grid {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
    }
    
    @keyframes gridMove {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }
    
    .hero-gradient {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      animation: gradientPulse 4s ease-in-out infinite;
    }
    
    @keyframes gradientPulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.5rem;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 50px;
      margin-bottom: 2rem;
      animation: badgeFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
    }
    
    @keyframes badgeFadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .badge-dot {
      width: 8px;
      height: 8px;
      background: #000;
      border-radius: 50%;
      animation: dotPulse 2s ease-in-out infinite;
    }
    
    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
    }
    
    .badge-text {
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: #000;
    }
    
    .hero-title {
      font-size: 4.5rem;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 2rem;
      color: #000;
    }
    
    .title-line {
      display: block;
      overflow: hidden;
    }
    
    .word {
      display: inline-block;
      margin: 0 0.5rem;
      animation: wordSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    }
    
    .word:nth-child(1) { animation-delay: 0.3s; }
    .word:nth-child(2) { animation-delay: 0.4s; }
    .title-line:nth-child(2) .word:nth-child(1) { animation-delay: 0.5s; }
    .title-line:nth-child(2) .word:nth-child(2) { animation-delay: 0.6s; }
    
    @keyframes wordSlideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .highlight {
      position: relative;
      color: #000;
    }
    
    .highlight::after {
      content: '';
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 15px;
      background: rgba(0,0,0,0.1);
      z-index: -1;
      animation: highlightExpand 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
    }
    
    @keyframes highlightExpand {
      from { width: 0; }
      to { width: 100%; }
    }
    
    .hero-description {
      font-size: 1.25rem;
      color: #666;
      margin-bottom: 3rem;
      line-height: 1.8;
    }
    
    .desc-line {
      display: block;
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    }
    
    .desc-line:nth-child(1) { animation-delay: 0.7s; }
    .desc-line:nth-child(2) { animation-delay: 0.8s; }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .hero-actions {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      margin-bottom: 4rem;
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s backwards;
    }
    
    .hero-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.25rem 3rem;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-size: 0.875rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .hero-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255,255,255,0.2);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      transition: all 0.6s ease;
    }
    
    .hero-btn:hover::before {
      width: 400px;
      height: 400px;
    }
    
    .hero-btn-primary {
      background: #000;
      color: #fff;
      border: 2px solid #000;
    }
    
    .hero-btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .btn-arrow {
      transition: transform 0.3s ease;
    }
    
    .hero-btn-primary:hover .btn-arrow {
      transform: translateX(5px);
    }
    
    .hero-btn-secondary {
      background: transparent;
      color: #000;
      border: 2px solid #000;
    }
    
    .hero-btn-secondary:hover {
      background: #000;
      color: #fff;
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .hero-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s backwards;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 900;
      color: #000;
      margin-bottom: 0.5rem;
      animation: countUp 2s ease-out 1.2s backwards;
    }
    
    @keyframes countUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    
    .stat-divider {
      width: 1px;
      height: 60px;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2), transparent);
    }
    
    @media (max-width: 768px) {
      .hero-section { padding: 4rem 0 3rem; }
      .hero-title { font-size: 2.5rem; }
      .hero-description { font-size: 1rem; }
      .hero-actions { flex-direction: column; }
      .hero-btn { width: 100%; justify-content: center; }
      .hero-stats { flex-direction: column; gap: 1.5rem; }
      .stat-divider { width: 60px; height: 1px; }
    }
  `]
})
export class HomeHeroComponent {}
