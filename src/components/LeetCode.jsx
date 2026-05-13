import React, { useState, useEffect } from 'react';
import { Code2, Trophy, Calendar, TrendingUp, Zap, Target, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

const LeetCode = () => {
  const [stats, setStats] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const username = 'Abhinav_K07';

  const normalizeLeetCodeStats = (data) => {
    const toNumberOrNull = (value) => {
      if (value === null || value === undefined) return null;
      const numeric = typeof value === 'number' ? value : Number(value);
      return Number.isFinite(numeric) ? numeric : null;
    };

    const getAllDifficultySubmissions = (list) => {
      if (!Array.isArray(list)) return null;
      return list.find((item) => item?.difficulty === 'All') ?? list[0] ?? null;
    };

    const acceptedAll = getAllDifficultySubmissions(data?.matchedUserStats?.acSubmissionNum);
    const totalAll = getAllDifficultySubmissions(data?.matchedUserStats?.totalSubmissionNum);
    const acceptedSubmissions = toNumberOrNull(acceptedAll?.submissions);
    const totalSubmissions = toNumberOrNull(totalAll?.submissions);
    const acceptanceRate =
      acceptedSubmissions !== null && totalSubmissions !== null && totalSubmissions > 0
        ? Number(((acceptedSubmissions / totalSubmissions) * 100).toFixed(1))
        : null;

    return {
      totalSolved: toNumberOrNull(data?.totalSolved) ?? 0,
      easySolved: toNumberOrNull(data?.easySolved) ?? 0,
      mediumSolved: toNumberOrNull(data?.mediumSolved) ?? 0,
      hardSolved: toNumberOrNull(data?.hardSolved) ?? 0,
      totalEasy: toNumberOrNull(data?.totalEasy) ?? 826,
      totalMedium: toNumberOrNull(data?.totalMedium) ?? 1725,
      totalHard: toNumberOrNull(data?.totalHard) ?? 744,
      ranking: toNumberOrNull(data?.ranking),
      acceptanceRate,
      contributionPoints:
        toNumberOrNull(data?.contributionPoints) ??
        toNumberOrNull(data?.contributionPoint) ??
        0
    };
  };

  // Extract topics/concepts from recent submissions
  const extractTopics = (submissions) => {
    if (!Array.isArray(submissions)) return [];
    const topicMap = {};
    submissions.slice(0, 20).forEach((sub) => {
      const title = sub?.title || '';
      const lang = sub?.lang || 'unknown';
      const key = `${title}|${lang}`;
      topicMap[key] = {
        title,
        lang,
        statusDisplay: sub?.statusDisplay
      };
    });
    return Object.values(topicMap).slice(0, 12);
  };

  useEffect(() => {
    fetchLeetCodeStats();
  }, []);

  const fetchLeetCodeStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`, {
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error(`Stats API request failed: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data);
      setStats(normalizeLeetCodeStats(data));
    } catch (error) {
      console.error('Error fetching LeetCode stats:', error);
      setStats({
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        totalEasy: 826,
        totalMedium: 1725,
        totalHard: 744,
        ranking: null,
        acceptanceRate: null,
        contributionPoints: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced animated stat card
  const AnimatedStatCard = ({ icon: Icon, label, value, color, gradient, bgColor, delay }) => (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:shadow-2xl animate-fade-in`}
      style={{
        animation: `slideUp 0.6s ease-out ${delay}ms both`,
        background: `linear-gradient(135deg, ${bgColor}15 0%, ${bgColor}05 100%)`,
        borderColor: `${bgColor}30`,
      }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${gradient}, transparent)`,
        }}
      />
      
      {/* Glow effect on hover */}
      <div className={`absolute -inset-1 ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500 -z-10`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 ${color} transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12`} />
        </div>
        <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
        <div className="text-gray-400 text-sm font-medium">{label}</div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

  // Circular progress component (trendy)
  const CircularProgress = ({ label, solved, total, color, icon: Icon, strokeColor }) => {
    const percentage = total > 0 ? (solved / total) * 100 : 0;
    const circumference = 2 * Math.PI * 45; // radius 45
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center group cursor-default transition-all duration-500 hover:scale-110">
        {/* Circular Progress SVG */}
        <div className="relative w-32 h-32 mb-4">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-gray-700/40"
            />
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${color}`}
            />
            {/* Glow effect circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
              className={`group-hover:opacity-30 transition-opacity duration-500 ${color}`}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Icon className={`w-8 h-8 ${color} mb-1`} />
            <div className={`text-2xl font-bold ${color}`}>{percentage.toFixed(0)}%</div>
          </div>
        </div>

        {/* Label and stats */}
        <h4 className="text-sm font-semibold text-gray-300 text-center mb-2">{label}</h4>
        <div className={`text-xs ${color} font-bold px-3 py-1 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50`}>
          {solved} / {total}
        </div>
      </div>
    );
  };

  // Problem category card
  const CategoryCard = ({ difficulty, solved, total, color, icon: Icon }) => {
    const percentage = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;

    return (
      <div className={`group relative overflow-hidden rounded-xl p-6 backdrop-blur-sm border transition-all duration-500 hover:scale-105 cursor-pointer`}
        style={{
          borderColor: `${color.split('-')[1]}30`,
          background: `linear-gradient(135deg, ${color.split('-')[1]}15 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Icon className={`w-6 h-6 ${color}`} />
            <span className={`text-2xl font-bold ${color}`}>{solved}</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">{difficulty}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">{percentage}%</span>
            <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${color.replace('text-', 'bg-')}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Recent solved problems component
  const RecentProblems = ({ submissions }) => {
    const recent = submissions?.slice(0, 6) || [];

    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Recent <span className="text-green-400">Solved</span> Problems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((sub, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl p-4 backdrop-blur-sm border border-gray-600/30 bg-gray-800/20 hover:bg-gray-800/40 transition-all duration-500 hover:border-green-500/50 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-gray-200 line-clamp-2">{sub?.title}</p>
                  {sub?.statusDisplay === 'Accepted' && (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                    {sub?.lang}
                  </span>
                  <span className="text-xs text-green-400 font-semibold">{sub?.statusDisplay}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="leetcode" className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              LeetCode <span className="text-red-500">Stats</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-full" />
          </div>
          <div className="text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-50 animate-pulse" />
              <div className="relative bg-gray-900 px-6 py-3 rounded-lg">
                <Zap className="w-6 h-6 text-red-500 mx-auto mb-2 animate-bounce" />
                <p className="text-gray-400">Fetching your LeetCode stats...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="leetcode" className="relative py-20 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        {/* Header with enhanced styling */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
            <Code2 className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400 font-semibold">Competitive Programming</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-yellow-400">
            LeetCode <span className="block text-white">Performance</span>
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-red-500 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
          </div>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My journey solving algorithmic challenges across multiple difficulty levels
          </p>
        </div>

        {/* Main Stats Cards with animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatedStatCard
            icon={Code2}
            label="Problems Solved"
            value={stats?.totalSolved ?? 0}
            color="text-red-400"
            gradient="from-red-500 to-red-600"
            bgColor="rgb(239, 68, 68)"
            delay={0}
          />
          <AnimatedStatCard
            icon={Trophy}
            label="Global Ranking"
            value={stats?.ranking ? `#${(stats.ranking).toLocaleString()}` : '—'}
            color="text-yellow-400"
            gradient="from-yellow-500 to-amber-600"
            bgColor="rgb(251, 146, 60)"
            delay={100}
          />
          <AnimatedStatCard
            icon={Target}
            label="Acceptance Rate"
            value={stats?.acceptanceRate === null ? '—' : `${stats.acceptanceRate}%`}
            color="text-green-400"
            gradient="from-green-500 to-emerald-600"
            bgColor="rgb(34, 197, 94)"
            delay={200}
          />
          <AnimatedStatCard
            icon={TrendingUp}
            label="Contribution Points"
            value={stats?.contributionPoints ?? 0}
            color="text-blue-400"
            gradient="from-blue-500 to-cyan-600"
            bgColor="rgb(59, 130, 246)"
            delay={300}
          />
        </div>

        {/* Category Cards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Difficulty <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-red-500">Breakdown</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              difficulty="Easy Problems"
              solved={stats?.easySolved ?? 0}
              total={stats?.totalEasy ?? 826}
              color="text-green-400"
              icon={CheckCircle2}
            />
            <CategoryCard
              difficulty="Medium Problems"
              solved={stats?.mediumSolved ?? 0}
              total={stats?.totalMedium ?? 1725}
              color="text-yellow-400"
              icon={Zap}
            />
            <CategoryCard
              difficulty="Hard Problems"
              solved={stats?.hardSolved ?? 0}
              total={stats?.totalHard ?? 744}
              color="text-red-400"
              icon={Target}
            />
          </div>
        </div>

        {/* Detailed Progress Section - Circular Style */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 mb-12">
          <h3 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-7 h-7 text-blue-400" />
            <span>Progress <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Tracker</span></span>
          </h3>
          
          {/* Circular Progress Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex justify-center">
              <CircularProgress
                label="Easy Problems"
                solved={stats?.easySolved ?? 0}
                total={stats?.totalEasy ?? 826}
                color="text-green-400"
                icon={CheckCircle2}
                strokeColor="rgb(74, 222, 128)"
              />
            </div>
            
            <div className="flex justify-center">
              <CircularProgress
                label="Medium Problems"
                solved={stats?.mediumSolved ?? 0}
                total={stats?.totalMedium ?? 1725}
                color="text-yellow-400"
                icon={Zap}
                strokeColor="rgb(250, 204, 21)"
              />
            </div>
            
            <div className="flex justify-center">
              <CircularProgress
                label="Hard Problems"
                solved={stats?.hardSolved ?? 0}
                total={stats?.totalHard ?? 744}
                color="text-red-400"
                icon={Target}
                strokeColor="rgb(248, 113, 113)"
              />
            </div>
          </div>

          {/* Overall Stats Bar Below Circles */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="text-center mb-6">
              <h4 className="text-lg font-bold text-gray-300">Overall Progress</h4>
            </div>
            <div className="flex items-center gap-6 max-w-2xl mx-auto">
              <div className="flex-1">
                <div className="relative w-full h-3 bg-gray-700/40 rounded-full overflow-hidden backdrop-blur-sm border border-gray-600/30">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: `${
                        stats?.totalSolved && stats?.totalEasy && stats?.totalMedium && stats?.totalHard
                          ? ((stats.totalSolved / (stats.totalEasy + stats.totalMedium + stats.totalHard)) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-right min-w-max">
                <div className="text-xl font-bold text-gray-100">
                  {stats?.totalSolved ?? 0}
                </div>
                <div className="text-xs text-gray-500">problems solved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Solved Problems */}
        {apiData?.recentSubmissions && (
          <RecentProblems submissions={apiData.recentSubmissions} />
        )}

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href={`https://leetcode.com/u/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <Code2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative">View Full LeetCode Profile</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default LeetCode;