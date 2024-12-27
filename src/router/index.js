import {Router} from '@vaadin/router';
import {getRoutes} from './routes';

export const setupRouter = (outlet) => {
  const router = new Router(outlet);
  const routes = getRoutes();

  const toPascalCase = (str) => {
    return str
      .replace(/-./g, (match) => match.charAt(1).toUpperCase())
      .replace(/^[a-z]/, (match) => match.toUpperCase());
  };

  const buildFolderPath = (route, folder = '../views') => {
    const haveChildren = route.children?.length > 0;
    if (haveChildren) {
      folder += `/${toPascalCase(route.component)}`;
    }
    const fileName = haveChildren
      ? 'index.js'
      : `${toPascalCase(route.component)}.js`;
    const path = `${folder}/${fileName}`;

    return {
      folder,
      fileName,
      path,
    };
  };

  const mappedRoutes = routes.map((route) => {
    const importPath = buildFolderPath(route);

    return {
      path: route.path,
      action: async () => {
        await import(importPath.path);
      },
      component: route.component,
      ...(route.children?.length > 0 && {
        children: route.children.map((subRoute) => {
          return {
            path: subRoute.path,
            action: async () => {
              await import(buildFolderPath(subRoute, importPath.folder).path);
            },
            component: subRoute.component,
          };
        }),
      }),
    };
  });

  router.setRoutes(mappedRoutes);
};
