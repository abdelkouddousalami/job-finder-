import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', [
    animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
  ])
]);
