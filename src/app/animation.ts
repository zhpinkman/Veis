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

export const compact = trigger('compact', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(
      ':enter',
      stagger('20ms', [
        animate(
          '300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            style({ opacity: 0, transform: 'translateY(40px)' }),
            style({ opacity: 1, transform: 'translateY(0)' })
          ])
        )
      ]),
      { optional: true }
    ),
    query(':leave', style({ opacity: 1 }), { optional: true }),
    query(
      ':leave',
      stagger('20ms', [
        animate(
          '400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            style({ opacity: 1, transform: 'translateY(0)' }),
            style({ opacity: 0, transform: 'translateY(-40px)' })
          ])
        )
      ]),
      { optional: true }
    )
  ])
]);

export const shake = trigger('shake', [
  state('shaking', style({ transform: 'scale(1.05)' })),
  state('normal', style({ transform: 'scale(1)' })),
  transition('normal <=> shaking', animate('300ms'))
]);

export const list = trigger('list', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(
      ':enter',
      stagger('20ms', [
        animate(
          '300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            style({ opacity: 0, transform: 'translateX(40px)' }),
            style({ opacity: 1, transform: 'translateX(0)' })
          ])
        )
      ]),
      { optional: true }
    ),
    query(':leave', style({ opacity: 1 }), { optional: true }),
    query(
      ':leave',
      stagger('20ms', [
        animate(
          '400ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          keyframes([
            style({ opacity: 1, transform: 'translateX(0)' }),
            style({ opacity: 0, transform: 'translateX(-40px)' })
          ])
        )
      ]),
      { optional: true }
    )
  ])
]);

export const flyInOut = trigger('flyInOut', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    animate(
      '200ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      keyframes([
        style({ opacity: 0, transform: 'translateX(15px)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
      ])
    )
  ]),
  transition('* => void', [
    animate(
      '200ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      keyframes([
        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 0, transform: 'translateX(-15px)', offset: 1.0 })
      ])
    )
  ])
]);
