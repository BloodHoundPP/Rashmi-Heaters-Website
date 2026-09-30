import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: "products",
        lazy: async () => {
          const { Products } = await import("./pages/Products");
          return { Component: Products };
        },
      },
      {
        path: "products/customized-heaters/:category",
        lazy: async () => {
          const { HeaterCategory } = await import("./pages/HeaterCategory");
          return { Component: HeaterCategory };
        },
      },
      {
        path: "products/:productId/:subCategory",
        lazy: async () => {
          const { HeaterCategory } = await import("./pages/HeaterCategory");
          return { Component: HeaterCategory };
        },
      },
      {
        path: "products/:id",
        lazy: async () => {
          const { ProductDetail } = await import("./pages/ProductDetail");
          return { Component: ProductDetail };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const { About } = await import("./pages/About");
          return { Component: About };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          const { Contact } = await import("./pages/Contact");
          return { Component: Contact };
        },
      },
      {
        path: "blogs",
        lazy: async () => {
          const { Blogs } = await import("./pages/Blogs");
          return { Component: Blogs };
        },
      },
    ],
  },
  {
    path: "/admin/login",
    lazy: async () => {
      const { AdminLogin } = await import("./pages/admin/AdminLogin");
      return { Component: AdminLogin };
    },
  },
  {
    path: "/admin",
    Component: ProtectedRoute,
    children: [
      {
        lazy: async () => {
          const { AdminLayout } = await import("./pages/admin/AdminLayout");
          return { Component: AdminLayout };
        },
        children: [
          {
            index: true,
            lazy: async () => {
              const { AdminDashboard } = await import("./pages/admin/AdminDashboard");
              return { Component: AdminDashboard };
            },
          },
          {
            path: "categories",
            lazy: async () => {
              const { AdminCategories } = await import("./pages/admin/AdminCategories");
              return { Component: AdminCategories };
            },
          },
          {
            path: "categories/new",
            lazy: async () => {
              const { AdminCategoryForm } = await import("./pages/admin/AdminCategoryForm");
              return { Component: AdminCategoryForm };
            },
          },
          {
            path: "categories/:id/edit",
            lazy: async () => {
              const { AdminCategoryForm } = await import("./pages/admin/AdminCategoryForm");
              return { Component: AdminCategoryForm };
            },
          },
          {
            path: "categories/:categoryId/subcategories",
            lazy: async () => {
              const { AdminSubcategories } = await import("./pages/admin/AdminSubcategories");
              return { Component: AdminSubcategories };
            },
          },
          {
            path: "categories/:categoryId/subcategories/:subId/products",
            lazy: async () => {
              const { AdminSubcategoryProducts } = await import("./pages/admin/AdminSubcategoryProducts");
              return { Component: AdminSubcategoryProducts };
            },
          },
        ],
      },
    ],
  },
]);