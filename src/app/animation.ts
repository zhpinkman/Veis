import {
  trigger,
  style,
  state,
  transition,
  animate,
  query,
  stagger,
  keyframes
} from '@angular/animations';

export let compact = trigger('compact', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(
      ':enter',
      stagger('30ms', [
        animate(
          '400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            style({ opacity: 0, transform: 'translateY(40px)' }),
            style({ opacity: 1, transform: 'translateY(0)' })
          ])
        )
      ]),
      { optional: true }
    )
  ])
]);

export let shake = trigger('shake', [
  state('shaking', style({ transform: 'scale(1.05)' })),
  state('normal', style({ transform: 'scale(1)' })),
  transition('normal <=> shaking', animate('300ms'))
]);

export let list = trigger('list', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(
      ':enter',
      stagger('30ms', [
        animate(
          '400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            style({ opacity: 0, transform: 'translateX(40px)' }),
            style({ opacity: 1, transform: 'translateX(0)' })
          ])
        )
      ]),
      { optional: true }
    )
  ])
]);
