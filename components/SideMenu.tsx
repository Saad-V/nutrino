'use client';

import React from 'react';

interface SideMenuProps {
    onClose: () => void;
    onNavigate: (view: any) => void;
    onLogout: () => void;
    userProfile: any;
}

export default function SideMenu({ onClose, onNavigate, onLogout, userProfile }: SideMenuProps) {
    const name = userProfile?.name || 'User';
    const initial = name.charAt(0).toUpperCase();

    // Prevent clicks inside the menu from closing it
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            {/* Background backdrop, show/hide based on slide-over state. */}
            <div
                className="absolute inset-0 bg-background-dark/60 transition-opacity backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                {/* Slide-over panel, show/hide based on slide-over state. */}
                <div
                    className="pointer-events-auto relative w-screen max-w-sm transform transition ease-in-out duration-500 sm:duration-700"
                    onClick={handleContentClick}
                >
                    <div className="relative z-50 h-full w-full bg-[#f6f8f6] rounded-r-2xl shadow-soft flex flex-col justify-between pl-6 pr-4 py-8 overflow-y-auto">
                        <div>
                            <div className="flex items-center gap-4 mb-10 mt-8 pl-2">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm text-[#0f1b0e] font-bold text-lg flex-shrink-0">
                                    {initial}
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[#0f1b0e] text-2xl font-bold leading-tight tracking-tight">{name}</h2>
                                    <span className="text-gray-500 text-sm font-medium leading-tight">Your daily plan</span>
                                </div>
                            </div>
                            <nav className="flex flex-col gap-3">
                                <button
                                    onClick={() => onNavigate('dashboard')}
                                    className="group flex items-center gap-4 px-4 h-14 rounded-full bg-white hover:bg-primary/10 transition-all duration-200 w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-[#0f1b0e] text-[24px]">grid_view</span>
                                    <p className="text-[#0f1b0e] text-base font-bold leading-tight tracking-tight">Dashboard</p>
                                </button>
                                <button
                                    onClick={() => onNavigate('add-food')}
                                    className="group flex items-center gap-4 px-4 h-14 rounded-full hover:bg-white transition-all duration-200 w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-[#0f1b0e] group-hover:text-primary transition-colors text-[24px]">add_circle</span>
                                    <p className="text-[#0f1b0e] text-base font-bold leading-tight tracking-tight">Add Food</p>
                                </button>
                                <button
                                    onClick={() => onNavigate('suggestions')}
                                    className="group flex items-center gap-4 px-4 h-14 rounded-full hover:bg-white transition-all duration-200 w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-[#0f1b0e] group-hover:text-primary transition-colors text-[24px]">eco</span>
                                    <p className="text-[#0f1b0e] text-base font-bold leading-tight tracking-tight">Meal Suggestions</p>
                                </button>
                                <button
                                    onClick={() => onNavigate('suggestions')}
                                    className="group flex items-center gap-4 px-4 h-14 rounded-full hover:bg-white transition-all duration-200 w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-[#0f1b0e] group-hover:text-primary transition-colors text-[24px]">menu_book</span>
                                    <p className="text-[#0f1b0e] text-base font-bold leading-tight tracking-tight">Recipes</p>
                                </button>
                            </nav>
                            <div className="h-8"></div>
                            <nav className="flex flex-col gap-1 px-4">
                                <button
                                    onClick={() => onNavigate('profile')}
                                    className="flex items-center gap-4 h-12 text-gray-500 hover:text-[#0f1b0e] transition-colors w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-[22px]">person</span>
                                    <p className="text-sm font-semibold">Profile</p>
                                </button>

                            </nav>
                        </div>
                        <div className="mt-8 px-4 pb-4">
                            <button
                                onClick={onLogout}
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0f1b0e] transition-colors text-sm font-medium"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
