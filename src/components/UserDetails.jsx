import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit3,
  Shield,
  Crown,
  Trophy,
  Target,
  TrendingUp,
  Code,
  Clock,
  Star
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import EditProfileModal from './EditProfileModal';

const UserDetails = () => {
  const { authUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for demonstration
  const userStats = {
    problemsSolved: 127,
    successRate: 89,
    totalSubmissions: 243,
    streak: 15,
    rank: 'Expert',
    points: 1247,
  };

  const achievements = [
    { icon: Trophy, label: 'First Solve', color: 'text-yellow-400' },
    { icon: Target, label: '100 Problems', color: 'text-green-400' },
    { icon: Star, label: 'Week Streak', color: 'text-blue-400' },
  ];

  return (
    <div className="card bg-base-100/50 backdrop-blur-sm shadow-xl border border-white/10">
      <div className="card-body p-0">
        {/* Header with Avatar and Basic Info */}
        <div className="relative p-6 bg-gradient-to-r from-codeflow-purple/20 to-codeflow-blue/20 rounded-t-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={authUser?.avatarUrl || 'https://avatar.iran.liara.run/public/boy'}
                alt="Profile"
                className="w-24 h-24 rounded-full ring-4 ring-codeflow-purple/50 object-cover"
              />
              {authUser?.role === 'ADMIN' && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-base-100"></div>
            </div>
            
            <h2 className="text-2xl font-bold text-base-content mb-1">
              {authUser?.fullname || 'John Doe'}
            </h2>
            
            <div className="flex items-center gap-2 mb-3">
              {authUser?.role === 'ADMIN' && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 text-xs rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
              {/* <span className="px-3 py-1 bg-codeflow-purple/20 text-codeflow-purple text-xs rounded-full">
                {userStats.rank}
              </span> */}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="btn btn-sm bg-gradient-to-r from-codeflow-purple to-codeflow-blue hover:from-codeflow-purple/90 hover:to-codeflow-blue/90 text-white border-0 gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </motion.button>
          </div>
        </div>

        {/* User Information */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-base-content/80">
            <Mail className="w-4 h-4 text-codeflow-blue" />
            <span className="text-sm">{authUser?.email || 'john.doe@example.com'}</span>
          </div>
          
          <div className="flex items-center gap-3 text-base-content/80">
            <Calendar className="w-4 h-4 text-codeflow-blue" />
            <span className="text-sm">
              Joined {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'Unknown'}
            </span>
          </div>
          
          {/* <div className="flex items-center gap-3 text-base-content/80">
            <MapPin className="w-4 h-4 text-codeflow-blue" />
            <span className="text-sm">San Francisco, CA</span>
          </div> */}

          {/* <div className="flex items-center gap-3 text-base-content/80">
            <Clock className="w-4 h-4 text-codeflow-blue" />
            <span className="text-sm">{userStats.streak} day streak</span>
          </div> */}
        </div>

        {/* Stats Grid */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-base-content mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-base-200/30 rounded-xl">
              <div className="text-xl font-bold text-codeflow-purple">{userStats.problemsSolved}</div>
              <div className="text-xs text-base-content/60">Problems Solved</div>
            </div>
            <div className="text-center p-3 bg-base-200/30 rounded-xl">
              <div className="text-xl font-bold text-codeflow-blue">{userStats.successRate}%</div>
              <div className="text-xs text-base-content/60">Success Rate</div>
            </div>
            <div className="text-center p-3 bg-base-200/30 rounded-xl">
              <div className="text-xl font-bold text-green-400">{userStats.points}</div>
              <div className="text-xs text-base-content/60">Points</div>
            </div>
            <div className="text-center p-3 bg-base-200/30 rounded-xl">
              <div className="text-xl font-bold text-yellow-400">{userStats.totalSubmissions}</div>
              <div className="text-xs text-base-content/60">Submissions</div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        {/* <div className="p-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-base-content mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-base-200/20 rounded-xl hover:bg-base-200/30 transition-colors"
              >
                <div className="p-2 bg-base-200/50 rounded-lg">
                  <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                </div>
                <div>
                  <div className="font-medium text-base-content">{achievement.label}</div>
                  <div className="text-xs text-base-content/60">Recently earned</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </div>
  );
};

export default UserDetails;
