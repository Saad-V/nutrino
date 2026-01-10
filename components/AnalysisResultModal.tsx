'use client';

interface AnalysisResultModalProps {
    result: any;
    onClose: () => void;
    onLog: () => void;
}

export default function AnalysisResultModal({ result, onClose, onLog }: AnalysisResultModalProps) {
    if (!result) return null;

    return (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center transition-all animate-in fade-in duration-200">
            <div className="bg-background w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 animate-slide-up sm:m-4 max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold text-text-dark font-display">Food Analyzed!</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <span className="material-symbols-outlined text-gray-600">close</span>
                    </button>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-soft mb-6 border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">restaurant</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-dark capitalize font-display">{result.food_name}</h3>
                            <p className="text-sm text-text-light font-body">{result.portion_estimate}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-body">Calories</span>
                            <span className="text-2xl font-black text-text-dark font-display">{result.calories}</span>
                        </div>
                        <div className="space-y-2 p-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-body">Protein</span>
                                <span className="font-bold text-protein font-body">{result.protein}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-body">Carbs</span>
                                <span className="font-bold text-carbs font-body">{result.carbs}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400 font-body">Fats</span>
                                <span className="font-bold text-fats font-body">{result.fats}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={onLog} className="w-full h-14 bg-primary hover:bg-[#4bd83b] text-white font-bold text-lg rounded-full shadow-lg active:scale-[0.98] transition-all font-display">
                    Log This Meal
                </button>
            </div>
        </div>
    );
}
