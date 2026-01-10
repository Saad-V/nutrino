'use client';

import { useState, useMemo } from 'react';

interface AnalysisPageProps {
    imageSrc: string;
    analysisResult: any;
    onBack: () => void;
    onSave: () => void;
}

export default function AnalysisPage({ imageSrc, analysisResult, onBack, onSave }: AnalysisPageProps) {
    // Parsing macros to numbers for the summary
    const getVal = (str: string | number) => {
        if (typeof str === 'number') return str;
        return parseFloat(str.toString().replace(/[^0-9.]/g, '')) || 0;
    };

    const calories = getVal(analysisResult.calories);
    const protein = getVal(analysisResult.protein);
    const carbs = getVal(analysisResult.carbs);
    const fats = getVal(analysisResult.fats);

    // In Phase 1, we map the single result to a list of one item.
    // Future: The API could return multiple items.
    const items = [
        {
            name: analysisResult.food_name,
            portion: analysisResult.portion_estimate,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fats: fats
        }
    ];

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background transition-colors duration-200">
            {/* Top Navigation */}
            <div className="sticky top-0 z-30 flex items-center justify-between bg-background/90 backdrop-blur-md px-4 py-3 transition-colors">
                <button
                    onClick={onBack}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors text-text-dark"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] font-display">Analysis</h2>
                <div className="size-10"></div> {/* Spacer */}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 px-5 pb-32 pt-2">
                {/* Headline */}
                <div className="mb-6 text-center">
                    <h1 className="text-text-dark text-[28px] font-extrabold leading-tight tracking-tight mb-2 font-display">Here’s what we found</h1>
                    <p className="text-primary text-[15px] font-medium leading-normal font-body">You can adjust anything before saving.</p>
                </div>

                {/* Hero Image */}
                <div className="mb-8 w-full">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-soft bg-gray-100 group">
                        {/* Using the actual uploaded image source */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url('${imageSrc}')` }}
                        >
                        </div>
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                </div>

                {/* Detected Items Section */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-text-dark font-bold text-lg font-display">Detected Items</h3>
                        <button className="text-sm font-semibold text-primary hover:text-green-600 transition-colors font-body">Add Item</button>
                    </div>

                    {items.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 shadow-soft border border-stone-100 flex flex-col gap-3 transition-transform active:scale-[0.99]">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <h4 className="text-text-dark text-lg font-bold leading-snug font-display capitalize">{item.name}</h4>
                                    <div className="flex items-center gap-2 mt-1 text-text-light text-sm font-medium font-body">
                                        <span>{item.portion}</span>
                                        <span className="size-1 rounded-full bg-stone-300"></span>
                                        <span>{item.calories} kcal</span>
                                    </div>
                                </div>
                                <button className="p-2 -mr-2 -mt-2 text-text-light hover:text-primary transition-colors rounded-full hover:bg-primary/5">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                            </div>

                            {/* Macros */}
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wide">
                                    <span className="size-1.5 rounded-full bg-orange-500"></span>
                                    P: {item.protein}g
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide">
                                    <span className="size-1.5 rounded-full bg-blue-500"></span>
                                    C: {item.carbs}g
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wide">
                                    <span className="size-1.5 rounded-full bg-yellow-500"></span>
                                    F: {item.fats}g
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Summary Section */}
                <div className="bg-stone-100 rounded-2xl p-6 mb-6">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <p className="text-text-light text-sm font-semibold uppercase tracking-wider mb-1 font-body">Total Summary</p>
                            <h3 className="text-text-dark text-4xl font-extrabold tracking-tight font-display">{calories} <span className="text-xl font-bold text-text-light">kcal</span></h3>
                        </div>
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-4">
                        {/* Calculation for visuals: max bars relative to a standard daily intake or just visual */}
                        <div className="flex flex-col gap-1">
                            <span className="text-text-light text-xs font-bold uppercase font-body">Protein</span>
                            <span className="text-text-dark text-lg font-bold font-display">{protein}g</span>
                            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-400" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-text-light text-xs font-bold uppercase font-body">Carbs</span>
                            <span className="text-text-dark text-lg font-bold font-display">{carbs}g</span>
                            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-text-light text-xs font-bold uppercase font-body">Fat</span>
                            <span className="text-text-dark text-lg font-bold font-display">{fats}g</span>
                            <div className="w-full h-1 bg-stone-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 w-full max-w-md bg-background/95 backdrop-blur-xl border-t border-stone-100 p-5 pb-8 z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-text-light text-xs font-medium font-body">Estimates only. Adjust if needed.</p>
                    <button
                        onClick={onSave}
                        className="w-full bg-primary hover:bg-[#4bd83b] active:scale-[0.98] transition-all text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 font-display"
                    >
                        <span className="material-symbols-outlined">check</span>
                        Add to Today
                    </button>
                </div>
            </div>
        </div>
    );
}
