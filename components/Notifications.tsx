'use client';

import React from 'react';

interface NotificationsProps {
    onBack: () => void;
}

export default function Notifications({ onBack }: NotificationsProps) {
    return (
        <div className="bg-gray-50 font-display text-[#333333] antialiased min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="relative flex flex-col h-[844px] w-full max-w-[390px] bg-[#fdfcf5] rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-gray-900/5 ring-1 ring-black/5">

                {/* Header with Close Button (replacing Status Bar for Web) */}
                <div className="h-14 w-full flex items-center justify-between px-6 z-20 sticky top-0 bg-[#fdfcf5]/90 backdrop-blur-sm">
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center -ml-2 p-2 rounded-full text-[#333333] hover:bg-black/5 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <span className="text-xs font-bold text-[#333333]">Notifications</span>
                    <div className="w-8"></div> {/* Spacer for center alignment */}
                </div>

                {/* Title Section */}
                <div className="px-6 pb-2 pt-2 bg-[#fdfcf5]/90 sticky top-14 z-10 backdrop-blur-sm border-b border-black/5">
                    <div className="flex items-end justify-between mb-4">
                        <h1 className="text-3xl font-extrabold text-[#333333] tracking-tight">Notifications</h1>
                        <button className="text-[#666666] hover:text-[#4ade80] text-sm font-semibold transition-colors pb-1.5">
                            Mark all read
                        </button>
                    </div>
                </div>

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar">

                    {/* Item 1 */}
                    <div className="group bg-[#ffffff] p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 flex gap-4 items-start relative border border-transparent hover:border-[#86efac]/20 cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-[#333333] text-[17px] leading-tight">Plan Updated</h3>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_15px_rgba(134,239,172,0.3)] mt-1.5"></span>
                            </div>
                            <p className="text-[#666666] text-[15px] leading-relaxed mb-2.5">Your nutritionist added 3 new recipes to your weekly plan.</p>
                            <p className="text-xs font-semibold text-gray-400">2m ago</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="group bg-[#ffffff] p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 flex gap-4 items-start relative border border-transparent hover:border-blue-200 cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">water_drop</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-[#333333] text-[17px] leading-tight">Hydration Check</h3>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_15px_rgba(134,239,172,0.3)] mt-1.5"></span>
                            </div>
                            <p className="text-[#666666] text-[15px] leading-relaxed mb-2.5">Time to log your water intake! You're halfway to your goal.</p>
                            <p className="text-xs font-semibold text-gray-400">2h ago</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="group bg-[#ffffff] p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 flex gap-4 items-start relative border border-transparent hover:border-orange-200 cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-[#333333] text-[17px] leading-tight">New Recipe</h3>
                            </div>
                            <p className="text-[#666666] text-[15px] leading-relaxed mb-2.5">Try the new Green Smoothie Bowl for a morning boost.</p>
                            <p className="text-xs font-semibold text-gray-400">5h ago</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="group bg-[#ffffff] p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 flex gap-4 items-start relative border border-transparent hover:border-purple-200 cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">leaderboard</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-[#333333] text-[17px] leading-tight">Weekly Report</h3>
                            </div>
                            <p className="text-[#666666] text-[15px] leading-relaxed mb-2.5">Your progress report is ready. You crushed your fiber goals!</p>
                            <p className="text-xs font-semibold text-gray-400">1d ago</p>
                        </div>
                    </div>

                    {/* Item 5 */}
                    <div className="group bg-[#ffffff]/80 p-5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex gap-4 items-start relative">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[24px]">emoji_events</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-[#333333] text-[17px] leading-tight">Goal Reached!</h3>
                            </div>
                            <p className="text-[#666666] text-[15px] leading-relaxed mb-2.5">You hit your protein target for 5 days in a row.</p>
                            <p className="text-xs font-semibold text-gray-400">2d ago</p>
                        </div>
                    </div>

                    <div className="h-8"></div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#fdfcf5] via-[#fdfcf5]/60 to-transparent pointer-events-none z-10"></div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#333333]/20 rounded-full z-20"></div>
            </div>
        </div>
    );
}
