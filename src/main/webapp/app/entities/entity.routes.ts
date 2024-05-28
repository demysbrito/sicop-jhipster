import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'sicopJHipsterApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'topico',
    data: { pageTitle: 'sicopJHipsterApp.topico.home.title' },
    loadChildren: () => import('./topico/topico.routes'),
  },
  {
    path: 'ajuda',
    data: { pageTitle: 'sicopJHipsterApp.ajuda.home.title' },
    loadChildren: () => import('./ajuda/ajuda.routes'),
  },
  {
    path: 'perfil',
    data: { pageTitle: 'sicopJHipsterApp.perfil.home.title' },
    loadChildren: () => import('./perfil/perfil.routes'),
  },
  {
    path: 'portaria',
    data: { pageTitle: 'sicopJHipsterApp.portaria.home.title' },
    loadChildren: () => import('./portaria/portaria.routes'),
  },
  {
    path: 'assunto',
    data: { pageTitle: 'sicopJHipsterApp.assunto.home.title' },
    loadChildren: () => import('./assunto/assunto.routes'),
  },
  {
    path: 'setor',
    data: { pageTitle: 'sicopJHipsterApp.setor.home.title' },
    loadChildren: () => import('./setor/setor.routes'),
  },
  {
    path: 'usuario',
    data: { pageTitle: 'sicopJHipsterApp.usuario.home.title' },
    loadChildren: () => import('./usuario/usuario.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
