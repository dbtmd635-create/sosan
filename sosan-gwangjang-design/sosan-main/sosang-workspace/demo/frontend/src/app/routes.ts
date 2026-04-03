import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";

// --- Pages 폴더 (인트로 및 분석 프로세스) ---
import { Landing } from "./pages/Landing";
import { SignupPage } from "./pages/SignupPage"; 
import { Signup } from "./pages/Signup";         
import { TypeSelection } from "./pages/TypeSelection";
import { NewEntrepreneurOnboarding } from "./pages/NewEntrepreneurOnboarding";
import { Questionnaire } from "./pages/Questionnaire";
import { ExistingOwnerQuestions } from "./pages/ExistingOwnerQuestions"; // 👈 신규 추가
import { JourneyTracker } from "./pages/JourneyTracker";
import { Dashboard } from "./pages/Dashboard"; // 👈 신규 추가

// --- Components 폴더 (메인 서비스 기능) ---
import { HomePage } from "./components/HomePage";
import { RegisterPage } from "./components/RegisterPage";
import { LoginPage } from "./components/LoginPage";
import { AIAnalysisPage } from "./components/AIAnalysisPage";
import { GovernmentSupport } from "./components/GovernmentSupport";
import { Community } from "./components/Community";
import { DxTools } from "./components/DxTools";
import { MarketPrice } from "./components/MarketPrice";
import { Marketplace } from "./components/Marketplace";
import { ChatPage } from "./components/ChatPage";

export const router = createBrowserRouter([
  // 1. 인트로 및 온보딩 (헤더 없음)
  { path: "/", Component: Landing },
  { path: "/signup", Component: SignupPage },
  { path: "/register", Component: Signup },
  { path: "/onboarding", Component: TypeSelection },
  
  // A. 신규 창업자용 흐름
  { path: "/onboarding/new-entrepreneur", Component: NewEntrepreneurOnboarding },
  { path: "/onboarding/questions", Component: Questionnaire },
  { path: "/onboarding/journey", Component: JourneyTracker },

  // B. 기존 사장님용 흐름
  { path: "/onboarding/existing/questions", Component: ExistingOwnerQuestions },
  
  // C. 최종 분석 결과 리포트
  { path: "/dashboard", Component: Dashboard },

  // 2. 인증 및 기타 독립 페이지
  { path: "/login", Component: LoginPage },
  { path: "/ai-analysis", Component: AIAnalysisPage },

  // 3. 실제 서비스 영역 (Layout 헤더 포함)
  {
    path: "/",
    Component: Layout,
    children: [
      { 
        path: "home", 
        Component: HomePage 
      },
      { path: "market-price", Component: MarketPrice },
      { path: "support", Component: GovernmentSupport },
      { path: "community", Component: Community },
      { path: "tools", Component: DxTools },
      { path: "trade", Component: Marketplace },
      { path: "chat", Component: ChatPage },
    ],
  },
]);