import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  // Animation presets for clean, subtle motion
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-[#FFD166] selection:text-[#0F172A]">
      {/* 1. NAVIGATION */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto md:px-12">
        <div className="flex items-center gap-2">
          {/* Minimal Logo */}
          <div className="w-6 h-6 rounded-sm bg-[#FF6B35] rotate-3"></div>
          <span className="font-bold text-xl tracking-tight">BuildLog</span>
          <div className="w-2 h-2 rounded-full bg-[#FF6B35]"></div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#0F172A]/80">
          <a href="#features" className="hover:text-[#FF6B35] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#FF6B35] transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#FF6B35] transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button className="hidden md:block hover:text-[#FF6B35] transition-colors">Sign In</button>
          <button className="bg-[#0F172A] text-white px-5 py-2.5 rounded-full hover:bg-[#0F172A]/90 transition-all shadow-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 pt-20 pb-32 max-w-7xl mx-auto md:px-12 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFD166]/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6B35]/10 rounded-full blur-3xl -z-10"></div>

        {/* Left Column: Copy */}
        <motion.div 
          className="flex-1 space-y-8 z-10"
          initial="hidden" animate="visible" variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD166]/30 border border-[#FFD166]/50 text-sm font-medium text-[#0F172A]">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]"></span>
            Build in public without thinking about content.
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Turn today's work into tomorrow's post.
          </h1>
          
          <p className="text-lg md:text-xl text-[#0F172A]/70 leading-relaxed max-w-xl">
            BuildLog helps you capture what you built, transform it into platform-ready content, and stay consistent without staring at a blank screen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#e85a25] transition-all hover:-translate-y-0.5 shadow-sm">
              Start Logging
            </button>
            <button className="px-8 py-4 rounded-full font-medium text-lg border border-[#0F172A]/20 hover:bg-[#0F172A]/5 transition-colors">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Right Column: Visual Storytelling Component */}
        <motion.div 
          className="flex-1 w-full max-w-lg relative z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white border border-[#0F172A]/10 rounded-3xl p-6 shadow-xl shadow-[#0F172A]/5 relative">
            {/* Initial Work Log Card */}
            <motion.div 
              className="bg-white border border-[#0F172A]/10 rounded-xl p-4 shadow-sm mb-6 z-20 relative"
              whileHover={{ y: -2 }}
            >
              <div className="text-xs font-semibold text-[#0F172A]/50 mb-1 uppercase tracking-wider">Daily Log</div>
              <div className="font-mono text-sm text-[#0F172A]">Fixed JWT refresh token bug and refactored auth middleware.</div>
            </motion.div>

            {/* Animated Connector */}
            <div className="absolute left-1/2 -translate-x-1/2 top-24 bottom-24 w-px bg-gradient-to-b from-[#0F172A]/20 via-[#FF6B35] to-[#0F172A]/20 z-0">
              <motion.div 
                className="w-2 h-2 rounded-full bg-[#FF6B35] absolute -left-[3.5px]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Output Cards */}
            <div className="grid grid-cols-3 gap-3 relative z-10 mt-12">
              {[
                { platform: "LinkedIn", color: "bg-[#0A66C2]" },
                { platform: "X", color: "bg-black" },
                { platform: "Facebook", color: "bg-[#1877F2]" }
              ].map((item, i) => (
                <motion.div 
                  key={item.platform}
                  className="bg-white border border-[#0F172A]/10 rounded-xl p-3 shadow-sm flex flex-col gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (i * 0.2) }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
                    <span className="text-[10px] font-bold text-[#0F172A]/60 uppercase tracking-wide">{item.platform}</span>
                  </div>
                  {/* Abstract skeleton text */}
                  <div className="w-full h-1.5 bg-[#0F172A]/10 rounded-full"></div>
                  <div className="w-5/6 h-1.5 bg-[#0F172A]/10 rounded-full"></div>
                  <div className="w-4/6 h-1.5 bg-[#0F172A]/10 rounded-full"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="px-6 py-32 bg-[#0F172A]/[0.02] border-y border-[#0F172A]/5">
        <div className="max-w-7xl mx-auto md:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Posting your progress should <br className="hidden md:block" /> take less than a minute.
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-12 relative"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {/* Step 1 */}
            <motion.div variants={fadeUp} className="relative">
              <div className="h-40 w-full mb-8 flex items-center justify-start">
                {/* Custom geometric illustration */}
                <div className="relative w-24 h-32 bg-white border-2 border-[#0F172A] rounded-lg shadow-[4px_4px_0px_0px_#0F172A]">
                  <div className="absolute top-4 left-4 right-4 h-2 bg-[#FF6B35] rounded-full"></div>
                  <div className="absolute top-10 left-4 w-10 h-2 bg-[#0F172A]/20 rounded-full"></div>
                  <div className="absolute top-14 left-4 w-12 h-2 bg-[#0F172A]/20 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD166] text-[#0F172A] flex items-center justify-center text-sm">1</span>
                Log today's work
              </h3>
              <p className="text-[#0F172A]/70 leading-relaxed">
                Write what you built, fixed, learned, or shipped. Don't worry about formatting; just brain-dump the facts.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeUp} className="relative">
              <div className="h-40 w-full mb-8 flex items-center justify-start">
                <div className="relative flex items-center justify-center w-24 h-24 bg-white border-2 border-[#0F172A] rounded-full shadow-[4px_4px_0px_0px_#0F172A]">
                  <div className="w-10 h-10 bg-[#FFD166] rounded-full mix-blend-multiply absolute -top-2 -right-2"></div>
                  <div className="w-8 h-8 bg-[#FF6B35] rounded-full mix-blend-multiply absolute -bottom-1 -left-1"></div>
                  <div className="w-3 h-3 bg-[#0F172A] rounded-full z-10"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD166] text-[#0F172A] flex items-center justify-center text-sm">2</span>
                Generate posts
              </h3>
              <p className="text-[#0F172A]/70 leading-relaxed">
                Buildlog translates your raw technical log into tailored, engaging versions specifically for LinkedIn, X, and Facebook.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeUp} className="relative">
              <div className="h-40 w-full mb-8 flex items-center justify-start">
                <div className="relative w-28 h-20 bg-white border-2 border-[#0F172A] rounded-xl shadow-[4px_4px_0px_0px_#0F172A] overflow-hidden flex flex-col justify-between p-3">
                  <div className="w-full flex justify-end">
                    <div className="w-6 h-6 bg-[#FF6B35] rounded-sm"></div>
                  </div>
                  <div className="w-1/2 h-2 bg-[#0F172A]/20 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFD166] text-[#0F172A] flex items-center justify-center text-sm">3</span>
                Share with confidence
              </h3>
              <p className="text-[#0F172A]/70 leading-relaxed">
                Review your drafts, copy the best one, open your platform of choice, and hit publish. You stay in complete control.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. DAILY CONSISTENCY SECTION */}
      <section className="px-6 py-32 max-w-7xl mx-auto md:px-12 flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          className="flex-1"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Small updates.<br />Big momentum.
          </h2>
          <p className="text-lg text-[#0F172A]/70 leading-relaxed mb-6">
            Most people don't struggle with building. They struggle with remembering to share what they built.
          </p>
          <p className="text-lg text-[#0F172A]/70 leading-relaxed border-l-2 border-[#FF6B35] pl-4">
            Momentum helps you stay visible without turning social media into a full-time job. Build your footprint organically, day by day.
          </p>
        </motion.div>

        {/* GitHub-style Heatmap Visualization */}
        <motion.div 
          className="flex-1 w-full bg-white border border-[#0F172A]/10 rounded-3xl p-8 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-semibold text-[#0F172A]">Your Consistency</h4>
            <span className="text-sm font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full">14 Day Streak</span>
          </div>
          
          <div className="flex gap-2">
            {/* Simulate weeks of a heatmap */}
            {[...Array(12)].map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-2">
                {[...Array(7)].map((_, dayIndex) => {
                  // Generate intentional "activity" pattern
                  const isFilled = Math.random() > 0.3;
                  const intensity = Math.random();
                  let colorClass = "bg-[#0F172A]/5"; // Empty state
                  
                  if (isFilled) {
                    if (intensity > 0.8) colorClass = "bg-[#FF6B35]";
                    else if (intensity > 0.4) colorClass = "bg-[#FF6B35]/70";
                    else colorClass = "bg-[#FF6B35]/40";
                  }

                  return (
                    <motion.div 
                      key={dayIndex} 
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-sm ${colorClass}`}
                      whileHover={{ scale: 1.2, borderRadius: "4px" }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. BROWSER EXTENSION SECTION */}
      <section className="px-6 py-32 bg-[#0F172A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto md:px-12 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Browser Mockup */}
          <motion.div 
            className="flex-1 w-full relative"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <div className="bg-white text-[#0F172A] rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Browser Header */}
              <div className="bg-[#f1f5f9] px-4 py-3 border-b border-[#0F172A]/10 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                </div>
                <div className="mx-auto bg-white border border-[#0F172A]/10 rounded-md text-[10px] px-24 py-1 text-[#0F172A]/50">linkedin.com</div>
              </div>
              
              {/* Browser Body Mockup */}
              <div className="p-6 h-64 bg-white flex relative">
                {/* Dummy LinkedIn Feed */}
                <div className="flex-1 space-y-4 pr-12">
                  <div className="w-full h-24 border border-[#0F172A]/10 rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A]/10 mb-3"></div>
                    <div className="w-24 h-2 bg-[#0F172A]/10 rounded-full mb-2"></div>
                    <div className="w-full h-2 bg-[#0F172A]/5 rounded-full"></div>
                  </div>
                </div>

                {/* Extension Overlay */}
                <motion.div 
                  className="absolute right-6 top-6 bottom-6 w-56 bg-white shadow-xl border border-[#0F172A]/10 rounded-xl p-4 flex flex-col z-10"
                  initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#0F172A]/5">
                    <div className="w-4 h-4 rounded-sm bg-[#FF6B35]"></div>
                    <span className="font-bold text-xs">Momentum</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="text-[10px] font-semibold text-[#0F172A]/50 uppercase">Draft Ready</div>
                    <p className="text-xs text-[#0F172A]/80 leading-relaxed">Excited to share that I just solved a massive JWT bug today...</p>
                  </div>
                  <button className="mt-auto w-full bg-[#0F172A] text-white text-xs font-medium py-2 rounded-md hover:bg-[#FF6B35] transition-colors">
                    Insert Draft
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div 
            className="flex-1 space-y-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Your content follows you.
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-white/70">No complicated integrations.</p>
              <p className="text-lg text-white/70">No account connections.</p>
              <p className="text-lg text-white/70">No posting permissions required.</p>
            </div>
            <p className="text-xl text-white font-medium pt-4">
              Just generate, insert, review, and publish from your own browser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="px-6 py-32 max-w-7xl mx-auto md:px-12">
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {/* Testimonial 1 */}
          <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl border border-[#0F172A]/10 shadow-sm flex flex-col justify-between">
            <p className="text-[#0F172A]/80 text-lg leading-relaxed mb-8">
              "I used to spend hours staring at a blank screen trying to figure out what to post. Now, I just drop in my daily backend logs—like setting up database schemas for our student app—and Momentum formats it perfectly for LinkedIn. It’s practically magic."
            </p>
            <div>
              <div className="font-bold text-[#0F172A]">Marcus T.</div>
              <div className="text-sm text-[#0F172A]/50">Software Developer</div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div variants={fadeUp} className="bg-[#FFD166]/10 p-8 rounded-2xl border border-[#FFD166]/30 shadow-sm flex flex-col justify-between">
            <p className="text-[#0F172A]/80 text-lg leading-relaxed mb-8">
              "Balancing a full-time dev role and my food blog meant my technical updates got completely ignored. With Momentum, I log my bug fixes at the end of the day and let it handle the rest. Small updates, huge visibility."
            </p>
            <div>
              <div className="font-bold text-[#0F172A]">Sarah J.</div>
              <div className="text-sm text-[#0F172A]/50">Backend Developer & Creator</div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl border border-[#0F172A]/10 shadow-sm flex flex-col justify-between">
            <p className="text-[#0F172A]/80 text-lg leading-relaxed mb-8">
              "Building an MVP from scratch was exhausting enough. By simply logging things like 'Refactored the roommate matching algorithm', Momentum gave me a week's worth of founder content without the empty marketing buzzwords."
            </p>
            <div>
              <div className="font-bold text-[#0F172A]">David K.</div>
              <div className="text-sm text-[#0F172A]/50">Startup Founder</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="px-6 py-40 bg-white text-center flex flex-col items-center justify-center border-t border-[#0F172A]/5">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-3xl"
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-[#0F172A] mb-8 leading-[1.05]">
            You already did the work. <br />
            <span className="text-[#0F172A]/40">Now share it.</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#0F172A]/60 mb-12">
            Start building your online presence one work log at a time.
          </p>
          
          <button className="group relative inline-flex items-center justify-center text-2xl font-bold text-[#0F172A] pb-1">
            Start Logging For Free
            {/* Animated Hover Underline */}
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF6B35] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </button>
        </motion.div>
      </section>
    </div>
  );
}