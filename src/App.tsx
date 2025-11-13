import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/global/Layout";
import { ServicesPage } from "./pages/ServicesPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="servicos" element={<ServicesPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* (Futuras rotas iriam aqui, ex: <Route path="blog" ... />) */}
      </Route>
    </Routes>
  );
}
