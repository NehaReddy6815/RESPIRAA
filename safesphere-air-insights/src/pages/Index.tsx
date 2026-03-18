import { useState } from "react";
import { LayoutDashboard, Activity, TrendingUp, Map, User, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HealthOnboarding from "@/pages/HealthOnboarding";
import Microplastic from "@/pages/Microplastic";
import Dashboard from "@/pages/Dashboard";
import Analyze from "@/pages/Analyze";
import Trends from "@/pages/Trends";
import Maps from "@/pages/Maps";
import Profile from "@/pages/Profile";


const tabs = [
  { id: "Microplastic", icon: Droplets },
  { id: "Dashboard", icon: LayoutDashboard },
  { id: "Analyze", icon: Activity },
  { id: "Trends", icon: TrendingUp },
  { id: "Maps", icon: Map },
  { id: "Profile", icon: User },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabComponents: Record<TabId, React.FC> = {
  Microplastic,
  Dashboard,
  Analyze,
  Trends,
  Maps,
  Profile,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("Dashboard");
  const [profileComplete, setProfileComplete] = useState(false);

  // 👉 SHOW ONBOARDING FIRST
  if (!profileComplete) {
   return <HealthOnboarding onComplete={() => setProfileComplete(true)} />;
  }

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-glow" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Droplets className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-display text-foreground">
              SafeSphere
            </span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id ? "tab-active" : "tab-inactive"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.id}</span>
              </button>
            ))}
          </div>

          {/* Avatar only (no logout) */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="avatar"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;