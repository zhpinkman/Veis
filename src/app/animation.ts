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

export let list = trigger('list', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(
      ':enter',
      stagger('300ms', [
        animate(
          '500ms ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            style({ opacity: 1, transform: 'translateY(0)' })
          ])
        )
      ]),
      { optional: true }
    )
  ])
]);
