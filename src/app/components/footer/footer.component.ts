import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="premium-footer">
      <div class="footer-top-line"></div>
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3 class="brand-title">JobFinder</h3>
            <p class="brand-tagline">Your Gateway to Career Success</p>
          </div>
          
          <div class="footer-links">
            <div class="link-column">
              <h4 class="column-title">Platform</h4>
              <ul class="link-list">
                <li><a href="#" class="footer-link">Search Jobs</a></li>
                <li><a href="#" class="footer-link">Companies</a></li>
                <li><a href="#" class="footer-link">Resources</a></li>
              </ul>
            </div>
            
            <div class="link-column">
              <h4 class="column-title">Support</h4>
              <ul class="link-list">
                <li><a href="#" class="footer-link">Help Center</a></li>
                <li><a href="#" class="footer-link">Contact</a></li>
                <li><a href="#" class="footer-link">FAQ</a></li>
              </ul>
            </div>
            
            <div class="link-column">
              <h4 class="column-title">Legal</h4>
              <ul class="link-list">
                <li><a href="#" class="footer-link">Privacy</a></li>
                <li><a href="#" class="footer-link">Terms</a></li>
                <li><a href="#" class="footer-link">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            <span class="copyright-symbol">©</span>
            <span class="copyright-year">2026</span>
            <span class="copyright-name">JobFinder</span>
            <span class="copyright-divider">—</span>
            <span class="copyright-text">All Rights Reserved</span>
          </div>
          
          <div class="footer-social">
            <span class="social-label">Follow Us</span>
            <div class="social-links">
              <a href="#" class="social-link">Li</a>
              <a href="#" class="social-link">Tw</a>
              <a href="#" class="social-link">Fb</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .premium-footer {
      background: #000;
      color: #fff;
      margin-top: 5rem;
      position: relative;
      overflow: hidden;
    }
    
    .footer-top-line {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%);
      background-size: 200% 100%;
      animation: lineShineFooter 3s linear infinite;
    }
    
    @keyframes lineShineFooter {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .container {
      padding: 4rem 1rem 2rem;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 4rem;
      margin-bottom: 3rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .footer-brand {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .brand-title {
      font-size: 2rem;
      font-weight: 900;
      letter-spacing: 2px;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #fff 0%, #ccc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .brand-tagline {
      color: #999;
      font-size: 1rem;
      letter-spacing: 0.5px;
      line-height: 1.6;
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    
    .link-column {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .link-column:nth-child(1) { animation-delay: 0.1s; }
    .link-column:nth-child(2) { animation-delay: 0.2s; }
    .link-column:nth-child(3) { animation-delay: 0.3s; }
    
    .column-title {
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1.5rem;
      color: #fff;
    }
    
    .link-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .link-list li {
      margin-bottom: 0.75rem;
    }
    
    .footer-link {
      color: #999;
      text-decoration: none;
      font-size: 0.9375rem;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
    }
    
    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: #fff;
      transition: width 0.3s ease;
    }
    
    .footer-link:hover {
      color: #fff;
      transform: translateX(5px);
    }
    
    .footer-link:hover::after {
      width: 100%;
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 0;
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .copyright {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.875rem;
      letter-spacing: 0.5px;
    }
    
    .copyright-symbol {
      font-size: 1rem;
    }
    
    .copyright-name {
      font-weight: 700;
      color: #fff;
    }
    
    .copyright-divider {
      color: #444;
    }
    
    .footer-social {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .social-label {
      color: #666;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
    }
    
    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #333;
      color: #999;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.75rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .social-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: #fff;
      transition: left 0.3s ease;
    }
    
    .social-link:hover::before {
      left: 0;
    }
    
    .social-link:hover {
      color: #000;
      border-color: #fff;
      transform: translateY(-3px);
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .footer-links {
        grid-template-columns: 1fr;
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}
