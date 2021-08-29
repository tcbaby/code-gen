#set ($name = $!name.substring(0,1).toLowerCase()+$!name.substring(1))

export const constantRoutes = [
  {
    path: "/${name}",
    name: "${name}",
    component: Layout,
    redirect: "${path}",
    children: [
      {
        path: "${path}",
        name: "${name}",
        component: () => import("@/views${path}"),
        meta: { title: "${name}", icon: "dashboard" },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: "/${name}",
    name: "${name}",
    component: "layout",
    redirect: "${path}",
    children: [
      {
        path: "${path}",
        name: "${name}",
        component: "views${path}",
        meta: { title: "${name}", icon: "dashboard" },
      },
    ],
  },
];
