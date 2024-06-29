import { defineConfig } from '@umijs/max';
import routes from './src/router';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'BrookUI',
  },
  routes: routes,
  npmClient: 'yarn',
});

