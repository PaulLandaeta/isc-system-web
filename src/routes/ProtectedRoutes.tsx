import { Navigate } from "react-router-dom";
import { createElement } from "react";
import type { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import { useUserStore } from "../store/store"; 
import RoleGuard from "./RoleGuard";
import { pages } from "./Pages"; 

const ProtectedRoutes = (): RouteObject[] => {
  const { user, menu } = useUserStore.getState();

  if (!user) {
    return [
      {
        path: "/",
        element: createElement(Navigate, { to: "/login", replace: true }),
      },
    ];
  }

  const dynamicRoutes: RouteObject[] = menu.flatMap(({ items }) =>
    items.map(({ path }) => {
      const Component = pages[path];
      if (!Component) return null;

      return {
        path,
        element: createElement(RoleGuard, { allowedRoles: user.roles, children: createElement(Component) }),
      };
    })
  ).filter(Boolean) as RouteObject[];

  return [
    {
      path: "/",
      element: createElement(Layout),
      children: [
        {
          index: true,
          element: createElement(Navigate, { to: "/dashboard", replace: true }),
        },
        ...dynamicRoutes,
        {
          path: "*",
          element: createElement(Navigate, { to: "/notfound" }),
        },
      ],
    },
  ];
};

export default ProtectedRoutes;

