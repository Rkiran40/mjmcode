import EditGalleryAlbum from "./pages/admin/EditGalleryAlbum";
import BreakingNewsAdmin from "./pages/admin/BreakingNewsAdmin";
          <Route
            path="/admin/breaking-news"
            element={
              <AdminRoute>
                <BreakingNewsAdmin />
              </AdminRoute>
            }
          />
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import NewsDetail from "./pages/NewsDetail";
import LatestNews from "./pages/LatestNews";
import Gallery from "./pages/Gallery";
import Video from "./pages/Video";
import EPaper from "./pages/EPaper";
import GalleryAlbum from "./pages/GalleryAlbum";

import AddVideo from "./pages/admin/AddVideo";
import AddGallery from "./pages/admin/AddGallery";
import AddGalleryAlbum from "./pages/admin/AddGalleryAlbum";

// Admin imports
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddNews from "./pages/admin/AddNews";
import EditNews from "./pages/admin/EditNews";
import AdminRoute from "./components/AdminRoute";
import GalleryList from "./pages/admin/GalleryAlbumList";
import UploadAlbumImages from "./pages/admin/UploadAlbumImages";

function AppContent() {
  const location = useLocation();
  const hideAds = location.pathname.startsWith("/admin");

  return (
    <div className="content-area">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<LatestNews />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<GalleryAlbum />} />
        <Route path="/video" element={<Video />} />
        <Route path="/epaper" element={<EPaper />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/breaking-news" element={<AdminRoute><BreakingNewsAdmin /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/add" element={<AdminRoute><AddNews /></AdminRoute>} />
        <Route path="/admin/video/add" element={<AdminRoute><AddVideo /></AdminRoute>} />
        <Route path="/admin/gallery/add" element={<AdminRoute><AddGallery /></AdminRoute>} />
        <Route path="/admin/gallery" element={<AdminRoute><GalleryList /></AdminRoute>} />
        <Route path="/admin/gallery/album/add" element={<AdminRoute><AddGalleryAlbum /></AdminRoute>} />
        <Route path="/admin/gallery/edit/:id" element={<AdminRoute><EditGalleryAlbum /></AdminRoute>} />
        <Route path="/admin/gallery/:id/images" element={<AdminRoute><UploadAlbumImages /></AdminRoute>} />
        <Route path="/admin/edit/:id" element={<AdminRoute><EditNews /></AdminRoute>} />
      </Routes>
      {/* Right-side ad column: 25% width. Hidden on admin routes. */}
      {!hideAds && (
        <aside className="ad-column" aria-label="Advertisements">
          <div className="ad-section">
            <div className="ad-inner">
              <div className="ad-box">Advertisement</div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-main">
        <Header />
        <main className="main-content">
          <AppContent />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
