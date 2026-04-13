import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/contexts/I18nContext";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import Landing from "./pages/Landing";
import Modpacks from "./pages/Modpacks";
import ProjectDashboard from "./pages/ProjectDashboard";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Adicionamos a div com bg-grid aqui para cobrir o site todo */}
          <div className="min-h-screen bg-background bg-grid flex flex-col">
            <TopNav />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/modpacks" element={<Modpacks />} />
                <Route path="/project/:slug" element={<ProjectDashboard />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsArticle />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
