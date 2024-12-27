import {msg} from '@lit/localize';

export function getRoutes() {
  return [
    {
      path: '/',
      component: 'home-view',
      label: msg('Home', {desc: 'Home link in navigation'}),
    },
    {
      path: '/employee-list',
      component: 'employee-view',
      label: msg('Employees', {desc: 'About link in the navigation'}),
      additionalLinks: [
        {path: '/employee-list/add-new', label: msg('Add Employee')},
      ],
      children: [
        {
          path: '/',
          component: 'employee-list-view',
          label: msg('Employee', {desc: 'About link in the navigation'}),
        },
        {
          path: 'add-new',
          component: 'edit-employee-view',
          label: msg('Add Employee'),
        },
        {
          path: '/edit-employee/:id',
          component: 'edit-employee-view',
          label: msg('Edit Employee'),
        },
      ],
    },
  ];
}
