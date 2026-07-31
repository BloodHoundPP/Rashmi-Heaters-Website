import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { HeaterCategory } from "./pages/HeaterCategory";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Blogs } from "./pages/Blogs";
import { Layout } from "./components/Layout";

import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminCategories } from "./pages/admin/AdminCategories";
import { AdminCategoryForm } from "./pages/admin/AdminCategoryForm";
import { AdminSubcategories } from "./pages/admin/AdminSubcategories";
import { AdminSubcategoryProducts } from "./pages/admin/AdminSubcategoryProducts";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/customized-heaters/:category", Component: HeaterCategory },
      { path: "products/:productId/:subCategory", Component: HeaterCategory },
      { path: "products/:id", Component: ProductDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "blogs", Component: Blogs },
    ],
  },
  { path: "/admin/login", Component: AdminLogin },
  {
    path: "/admin",
    Component: ProtectedRoute,
    children: [
      {
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "categories", Component: AdminCategories },
          { path: "categories/new", Component: AdminCategoryForm },
          { path: "categories/:id/edit", Component: AdminCategoryForm },
          { path: "categories/:categoryId/subcategories", Component: AdminSubcategories },
          { path: "categories/:categoryId/subcategories/:subId/products", Component: AdminSubcategoryProducts },
        ],
      },
    ],
  },
]);