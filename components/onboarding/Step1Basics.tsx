'use client';

interface Step1BasicsProps {
    data: {
        name: string;
        age: string;
        gender: string;
        height: string;
        weight: string;
    };
    onUpdate: (data: any) => void;
    onNext: () => void;
}

export default function Step1Basics({ data, onUpdate, onNext }: Step1BasicsProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onUpdate({ [name]: value });
    };

    const handleGenderSelect = (gender: string) => {
        onUpdate({ gender });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-6 pb-32">
                <div className="mt-4 mb-8 text-center sm:text-left">
                    <h1 className="text-text-dark tracking-tight text-3xl sm:text-4xl font-extrabold leading-tight mb-3 font-display">
                        Let’s start with the basics
                    </h1>
                    <p className="text-text-light text-lg font-medium leading-normal font-body">
                        This helps us personalize your nutrition.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Name */}
                    <div className="flex flex-col gap-3">
                        <label className="text-text-dark text-base font-bold ml-1 font-body" htmlFor="name">Name</label>
                        <div className="relative group">
                            <input
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full h-16 rounded-2xl border-none bg-white text-text-dark px-6 text-lg font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-primary/50 shadow-soft transition-all"
                                id="name"
                                placeholder="Enter your name"
                                type="text"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                        </div>
                    </div>
                    {/* Age */}
                    <div className="flex flex-col gap-3">
                        <label className="text-text-dark text-base font-bold ml-1 font-body" htmlFor="age">Age</label>
                        <div className="relative group">
                            <input
                                name="age"
                                value={data.age}
                                onChange={handleChange}
                                className="w-full h-16 rounded-2xl border-none bg-white text-text-dark px-6 text-lg font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-primary/50 shadow-soft transition-all"
                                id="age"
                                inputMode="numeric"
                                placeholder="e.g. 28"
                                type="number"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                                <span className="material-symbols-outlined">cake</span>
                            </div>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-3">
                        <label className="text-text-dark text-base font-bold ml-1 font-body">Gender</label>
                        <div className="flex flex-wrap gap-3">
                            {['Female', 'Male', 'Non-binary'].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => handleGenderSelect(g)}
                                    className={`flex h-12 flex-1 min-w-[100px] cursor-pointer items-center justify-center gap-x-2 rounded-full px-6 transition-all active:scale-95 border-2 ${data.gender === g
                                        ? 'bg-primary/20 border-primary text-text-dark font-bold'
                                        : 'bg-white border-transparent text-text-light font-medium shadow-soft hover:bg-gray-50'
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Height & Weight */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <label className="text-text-dark text-base font-bold ml-1 font-body" htmlFor="height">Height</label>
                            <div className="relative">
                                <input
                                    name="height"
                                    value={data.height}
                                    onChange={handleChange}
                                    className="w-full h-16 rounded-2xl border-none bg-white text-text-dark px-6 text-lg font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-primary/50 shadow-soft transition-all"
                                    id="height"
                                    inputMode="numeric"
                                    placeholder="0"
                                    type="number"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium pointer-events-none">cm</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-text-dark text-base font-bold ml-1 font-body" htmlFor="weight">Weight</label>
                            <div className="relative">
                                <input
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    className="w-full h-16 rounded-2xl border-none bg-white text-text-dark px-6 text-lg font-medium placeholder:text-gray-300 focus:ring-2 focus:ring-primary/50 shadow-soft transition-all"
                                    id="weight"
                                    inputMode="numeric"
                                    placeholder="0"
                                    type="number"
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium pointer-events-none">kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-8 px-6">
                <button
                    onClick={onNext}
                    className="group w-full h-14 rounded-full bg-primary hover:bg-[#4bd83b] text-text-dark text-lg font-bold shadow-glow flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                    Next
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
