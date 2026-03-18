import { useState } from "react";
import { Droplets, HeartPulse, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

// ✅ shadcn select
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const healthConditions = [
  { key: "has_breathing_issues", label: "Breathing difficulties" },
  { key: "has_allergies", label: "Allergies" },
  { key: "has_asthma", label: "Asthma" },
  { key: "has_heart_condition", label: "Heart condition" },
] as const;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

interface Props {
  onComplete: () => void;
}

const HealthOnboarding = ({ onComplete }: Props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [conditions, setConditions] = useState<Record<string, boolean>>({
    has_breathing_issues: false,
    has_allergies: false,
    has_asthma: false,
    has_heart_condition: false,
  });
  const [otherConditions, setOtherConditions] = useState("");
  const [error, setError] = useState("");

  const toggleCondition = (key: string) => {
    setConditions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !gender) {
      setError("Please fill in your name, age and gender");
      return;
    }

    const userData = {
      name,
      age,
      gender,
      conditions,
      otherConditions,
    };

    localStorage.setItem("userProfile", JSON.stringify(userData));
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-glow" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Droplets className="text-primary-foreground w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-display text-foreground">
            SafeSphere
          </span>
        </div>

        <GlassCard className="p-8">
          
          <div className="flex items-center gap-3 mb-2">
            <HeartPulse className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Your Health Profile
            </h2>
          </div>

          <p className="text-muted-foreground text-sm mb-6">
            Help us personalize air quality recommendations for you
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input-glass"
                required
              />
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Age */}
              <div>
                <label className="block text-sm mb-1.5">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-glass"
                  required
                />
              </div>

              {/* Gender (FIXED) */}
              <div>
                <label className="block text-sm mb-1.5">Gender</label>

                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="input-glass">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>

                  <SelectContent className="z-50">
                    {genderOptions.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>
            </div>

            {/* Conditions */}
            <div>
              <p className="text-sm mb-3">Health Conditions</p>
              <div className="grid grid-cols-2 gap-3">
                {healthConditions.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => toggleCondition(c.key)}
                    className={`p-3 rounded-xl border transition ${
                      conditions[c.key]
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Other */}
            <input
              type="text"
              value={otherConditions}
              onChange={(e) => setOtherConditions(e.target.value)}
              placeholder="Other conditions..."
              className="input-glass"
            />

            {/* Error */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              className="btn-primary w-full flex justify-center gap-2"
            >
              Complete Setup
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default HealthOnboarding;