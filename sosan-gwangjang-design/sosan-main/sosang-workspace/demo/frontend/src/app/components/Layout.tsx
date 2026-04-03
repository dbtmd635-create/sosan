import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  Store,
  Home,
  FileText,
  Users,
  Wrench,
  ShoppingCart,
  Menu,
  X,
  Bell,
  LogIn,
  ChevronUp,
  Phone,
  Mail,
  ExternalLink,
  TrendingUp,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { path: "/home", label: "서비스 홈", icon: Home }, 
  { path: "/support", label: "지원사업", icon: FileText },
  { path: "/community", label: "커뮤니티", icon: Users },
  { path: "/market-price", label: "시세", icon: TrendingUp },
  { path: "/trade", label: "광장", icon: ShoppingCart },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const location = useLocation(); // 👈 현재 주소를 가져옵니다.
  const navigate = useNavigate();

  // 현재 페이지가 메인홈(/home)인지 확인
  const isHomePage = location.pathname === "/home";

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 8);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#141720] text-white font-sans">
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? "shadow-2xl border-white/10" : "border-transparent"
        }`}
        style={{
          backgroundColor: 'rgba(20, 23, 32, 0.85)',
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 60%)`,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[64px]">
            
            <div className="flex items-center gap-8">
              {/* 로고 영역 */}
              <Link to="/home" className="flex items-center gap-2.5 shrink-0 group">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                  <Store className="w-[18px] h-[18px] text-white" />
                </div>
                <span className="text-white font-black text-xl tracking-tighter">소상광장</span>
              </Link>

              {/* [수정 포인트] 메인화면(/home)이 아닐 때만 "소상광장 홈으로" 버튼 노출 */}
              {!isHomePage && (
                <button 
                  onClick={() => navigate("/home")}
                  className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                  <span>소상광장 홈으로</span>
                </button>
              )}
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all duration-200 mx-0.5 ${
                      isActive
                        ? "text-emerald-400 bg-emerald-400/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-[15px] h-[15px]" />
                    <span className="text-[0.84rem] font-bold">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="h-9 px-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-[0.84rem] font-bold"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="w-4 h-4 mr-1.5" /> 로그인
                </Button>
                
                <Button
                  className="h-9 px-4 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 text-[0.84rem] font-black transition-all"
                  onClick={() => navigate("/signup")}
                >
                  <UserPlus className="w-4 h-4 mr-1.5" /> 무료 가입
                </Button>
              </div>

              <Button variant="ghost" size="icon" className="relative w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/5">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-[#141720]" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-9 h-9 rounded-xl text-slate-400 hover:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 p-4 bg-[#141720]">
            <nav className="flex flex-col gap-1">
              {/* 모바일에서도 메인이 아닐 때만 노출 */}
              {!isHomePage && (
                <button 
                  onClick={() => { navigate("/home"); setMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-400 bg-emerald-400/5 font-bold mb-2 border border-emerald-400/10"
                >
                  <Home className="w-5 h-5" /> 소상광장 홈으로
                </button>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold">{item.label}</span>
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-6">
                <Button variant="outline" className="rounded-xl h-11 border-white/10 text-slate-300" onClick={() => navigate("/login")}>로그인</Button>
                <Button className="rounded-xl h-11 bg-emerald-500 text-slate-950 font-bold" onClick={() => navigate("/signup")}>무료 가입</Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#0f111a] border-t border-white/5 text-slate-400 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Store className="w-4 h-4 text-slate-950" />
                </div>
                <span className="text-white font-bold text-xl">소상광장</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-slate-500">전주·전북 소상공인의 성공을 돕는 AI 기반 파트너입니다.</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-[10px] flex justify-between items-center opacity-40">
            <p>© 2026 소상광장. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-emerald-500 text-slate-950 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all"
        >
          <ChevronUp className="w-6 h-6 stroke-[3]" />
        </button>
      )}
    </div>
  );
}