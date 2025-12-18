import React, { useState, useEffect } from 'react';
import { Code2, Trophy, Calendar, TrendingUp } from 'lucide-react';

const LeetCode = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = 'Abhinav_K07';

  useEffect(() => {
    fetchLeetCodeStats();
  }, []);

  const fetchLeetCodeStats = async () => {
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching LeetCode stats:', error);
      // Fallback to static data if API fails
      setStats({
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        ranking: 0,
        acceptanceRate: 0
      });
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );

  const ProgressBar = ({ label, solved, total, color }) => {
    const percentage = total > 0 ? ((solved / total) * 100).toFixed(1) : 0;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300 font-medium">{label}</span>
          <span className="text-gray-400">{solved} / {total}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">{percentage}%</div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="leetcode" className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              LeetCode <span className="text-red-500">Stats</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </div>
          <div className="text-center text-gray-400">Loading stats...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="leetcode" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            LeetCode <span className="text-red-500">Stats</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My competitive programming journey and problem-solving statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Code2}
            label="Total Solved"
            value={stats?.totalSolved || 0}
            color="text-red-500"
          />
          <StatCard
            icon={Trophy}
            label="Global Ranking"
            value={stats?.ranking || 'N/A'}
            color="text-yellow-500"
          />
          <StatCard
            icon={Calendar}
            label="Acceptance Rate"
            value={`${stats?.acceptanceRate || 0}%`}
            color="text-green-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Contribution Points"
            value={stats?.contributionPoints || 0}
            color="text-blue-500"
          />
        </div>

        {/* Problem Breakdown */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-8 text-center">Problem Breakdown</h3>
          
          <div className="max-w-3xl mx-auto">
            <ProgressBar
              label="Easy Problems"
              solved={stats?.easySolved || 0}
              total={stats?.totalEasy || 826}
              color="bg-green-500"
            />
            <ProgressBar
              label="Medium Problems"
              solved={stats?.mediumSolved || 0}
              total={stats?.totalMedium || 1725}
              color="bg-yellow-500"
            />
            <ProgressBar
              label="Hard Problems"
              solved={stats?.hardSolved || 0}
              total={stats?.totalHard || 744}
              color="bg-red-500"
            />
          </div>

          {/* Profile Link */}
          <div className="text-center mt-8">
            <a
              href={`https://leetcode.com/u/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
            >
              <Code2 className="w-5 h-5" />
              View Full Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeetCode;