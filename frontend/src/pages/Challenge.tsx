import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, Star, Medal, TrendingUp, User, Users, Coffee } from 'lucide-react';

const challenges = {
  active: [
    {
      title: 'Spend under ₹10,000 this month',
      youProgress: 65,
      other: { name: 'Priya', progress: 45 },
      stake: '₹500',
      daysLeft: 12,
      icon: <TrendingUp size={18} className="text-gray-400" />
    },
    {
      title: 'No dining out for a week',
      youProgress: 80,
      other: { name: 'Vikram', progress: 90 },
      stake: '₹500',
      daysLeft: 3,
      icon: <Coffee size={18} className="text-gray-400" />
    },
    {
      title: 'Limit coffee spending to ₹500',
      youProgress: 20,
      other: { name: 'Meera', progress: 35 },
      stake: '₹300',
      daysLeft: 5,
      icon: <Coffee size={18} className="text-gray-400" />
    },
  ],
  completed: [
    {
      title: 'Save ₹5,000 in a month',
      result: 'won',
      opponent: 'Arjun',
      stake: '₹500',
      time: 'Last month',
      xpEarned: 150,
      streak: 3,
      badges: ['Savings Master', '3-Win Streak'],
      icon: <TrendingUp size={16} className="text-gray-400" />
    },
    {
      title: 'No online shopping for 2 weeks',
      result: 'lost',
      opponent: 'Neha',
      stake: '₹500',
      time: '2 months ago',
      xpEarned: 50,
      streak: 0,
      badges: [],
      icon: <TrendingUp size={16} className="text-gray-400" />
    },
    {
      title: 'Cook at home daily for 7 days',
      result: 'won',
      opponent: 'Simran',
      stake: '₹200',
      time: '3 weeks ago',
      xpEarned: 120,
      streak: 1,
      badges: ['Home Chef'],
      icon: <Coffee size={16} className="text-gray-400" />
    },
  ],
};

const ProgressBar = ({ label, value, isYou = false }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-400">
        <p className="font-medium">{label}</p>
        <p className="font-medium">{Math.round(value)}%</p>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className={`${isYou ? 'bg-white' : 'bg-gray-500'} h-1.5 rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const ChallengeCard = ({ challenge }) => {
  const isLeading = challenge.youProgress > challenge.other.progress;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-900 p-5 rounded-lg border border-gray-800 transition-all duration-200 hover:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 w-4/5">
          {challenge.icon}
          <h3 className="font-medium text-white">{challenge.title}</h3>
        </div>
        <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
          isLeading ? 'bg-gray-800 text-white' : 'bg-gray-800 text-gray-300'
        }`}>
          {isLeading ? 'Leading' : 'Trailing'}
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <ProgressBar label="You" value={challenge.youProgress} isYou={true} />
        <ProgressBar label={challenge.other.name} value={challenge.other.progress} />
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mt-4">
        <span className="flex items-center gap-1">
          <Trophy size={14} /> {challenge.stake} at stake
        </span>
        <span className={`flex items-center gap-1 ${challenge.daysLeft <= 3 ? 'text-gray-300' : ''}`}>
          <Clock size={14} /> {challenge.daysLeft} days left
        </span>
      </div>
      
      <div className="mt-4 pt-2 border-t border-gray-800">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1"
        >
          {isExpanded ? 'Show less' : 'View details'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-gray-400 space-y-2">
          <div className="flex justify-between">
            <span>Challenge started:</span>
            <span>April 9, 2025</span>
          </div>
          <div className="flex justify-between">
            <span>Challenge ends:</span>
            <span>May {challenge.daysLeft}, 2025</span>
          </div>
          <div className="flex justify-between">
            <span>Current status:</span>
            <span>{isLeading ? 'You are winning' : 'You need to catch up'}</span>
          </div>
          <div className="mt-3 flex justify-center">
            <button className="border border-gray-700 hover:border-white text-white px-3 py-1 rounded text-xs transition-colors">
              Send reminder to opponent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CompletedChallenge = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 transition-all duration-200 hover:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {data.icon}
          <h3 className="font-medium text-sm text-white">{data.title}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          data.result === 'won' ? 'bg-gray-800 text-white' : 'bg-gray-800 text-gray-400'
        }`}>
          {data.result === 'won' ? 'Won' : 'Lost'}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-400 mt-3">
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>You vs {data.opponent}</span>
        </div>
        {data.result === 'won' ? (
          <CheckCircle size={14} className="text-gray-300" />
        ) : (
          <XCircle size={14} className="text-gray-500" />
        )}
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span className="flex items-center gap-1">
          <Trophy size={14} /> {data.stake}
        </span>
        <span>{data.time}</span>
      </div>

      {data.xpEarned && (
        <div className="mt-2 pt-2 border-t border-gray-800">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>
      )}

      {showDetails && (
        <div className="mt-3 space-y-3">
          <div className="flex justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Star size={14} /> {data.xpEarned} XP Earned
            </span>
            {data.streak > 0 && (
              <span className="flex items-center gap-1">
                🔥 Streak: {data.streak}
              </span>
            )}
          </div>

          {data.badges?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {data.badges.map((badge, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full flex items-center gap-1"
                >
                  <Medal size={12} /> {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Challenge() {
  const [showCompleted, setShowCompleted] = useState(true);
  const [xp, setXp] = useState(720);
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState('card'); // 'card' or 'list'
  const xpToNextLevel = 1000;
  const level = Math.floor(xp / 500) + 1;
  const progressToNext = ((xp % 500) / 500) * 100;
  
  const filteredActive = activeFilter === 'all' 
    ? challenges.active 
    : activeFilter === 'leading' 
      ? challenges.active.filter(c => c.youProgress > c.other.progress)
      : challenges.active.filter(c => c.youProgress <= c.other.progress);

  return (
    <div className="min-h-screen w-full bg-black text-white px-4 lg:px-10 py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 className="text-2xl font-medium">Challenge Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Track your progress and compete with friends</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-sm font-medium">{level}</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400">Level {level}</p>
              <div className="w-24 bg-gray-800 rounded-full h-1">
                <div 
                  className="bg-white h-1 rounded-full"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{xp}/{xpToNextLevel} XP</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowCompleted((prev) => !prev)}
            className="text-xs border border-gray-800 hover:border-gray-600 px-3 py-1.5 rounded"
          >
            {showCompleted ? 'Hide History' : 'Show History'}
          </button>
        </div>
      </header>

      {/* Active Challenges */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-lg font-medium">Active Challenges</h2>
          
          <div className="flex gap-3 text-xs">
            <div className="flex bg-gray-900 rounded p-0.5 border border-gray-800">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded transition ${activeFilter === 'all' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveFilter('leading')}
                className={`px-3 py-1 rounded transition ${activeFilter === 'leading' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                Leading
              </button>
              <button 
                onClick={() => setActiveFilter('trailing')}
                className={`px-3 py-1 rounded transition ${activeFilter === 'trailing' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                Trailing
              </button>
            </div>
            
            <div className="flex bg-gray-900 rounded p-0.5 border border-gray-800">
              <button 
                onClick={() => setView('card')}
                className={`px-2 py-1 rounded transition flex items-center ${view === 'card' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 5h7V1H4v4zm9 0h7V1h-7v4zM4 13h7V7H4v6zm9 0h7V7h-7v6zM4 21h7v-6H4v6zm9 0h7v-6h-7v6z" />
                </svg>
              </button>
              <button 
                onClick={() => setView('list')}
                className={`px-2 py-1 rounded transition flex items-center ${view === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {view === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredActive.length > 0 ? (
              filteredActive.map((ch, idx) => (
                <ChallengeCard key={idx} challenge={ch} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 bg-gray-900 border border-gray-800 rounded">
                <p className="text-gray-400 text-sm">No challenges match your current filter.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-left text-xs">
                <tr>
                  <th className="px-4 py-2">Challenge</th>
                  <th className="px-4 py-2">Your Progress</th>
                  <th className="px-4 py-2">Opponent</th>
                  <th className="px-4 py-2">Stake</th>
                  <th className="px-4 py-2">Time Left</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredActive.length > 0 ? (
                  filteredActive.map((ch, idx) => (
                    <tr key={idx} className="hover:bg-gray-800">
                      <td className="px-4 py-3 flex items-center gap-2">
                        {ch.icon}
                        <span>{ch.title}</span>
                      </td>
                      <td className="px-4 py-3">{ch.youProgress}%</td>
                      <td className="px-4 py-3">{ch.other.name} ({ch.other.progress}%)</td>
                      <td className="px-4 py-3">{ch.stake}</td>
                      <td className="px-4 py-3">{ch.daysLeft} days</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          ch.youProgress > ch.other.progress ? 'bg-gray-700 text-white' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {ch.youProgress > ch.other.progress ? 'Leading' : 'Trailing'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
                      No challenges match your current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <button className="border border-gray-800 hover:border-gray-600 px-4 py-2 rounded text-sm flex items-center gap-2 transition-colors">
            <Users size={16} /> New Challenge
          </button>
        </div>
      </section>

      {/* Completed Challenges */}
      {showCompleted && (
        <section className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Challenge History</h2>
            <div className="text-xs text-gray-400">
              Total completed: {challenges.completed.length}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {challenges.completed.map((data, idx) => (
              <CompletedChallenge key={idx} data={data} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}