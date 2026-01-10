'use client';

import React, { useState, useEffect } from 'react';

interface ProfileProps {
    userProfile: any;
    onUpdateProfile: (newProfile: any) => void;
    onBack: () => void;
}

export default function Profile({ userProfile, onUpdateProfile, onBack }: ProfileProps) {
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [name, setName] = useState(userProfile.name || 'User');
    const [location, setLocation] = useState(userProfile.location || 'Unknown Location');
    const [goal, setGoal] = useState(userProfile.goal || 'Maintain');
    const [diet, setDiet] = useState(userProfile.diet || 'Any');
    const [calories, setCalories] = useState(userProfile.calories || 2100);
    const [allergies, setAllergies] = useState(userProfile.allergies || 'None');
    const [age, setAge] = useState(userProfile.age || '--');
    const [height, setHeight] = useState(userProfile.height || '--');
    const [weight, setWeight] = useState(userProfile.weight || '--');

    useEffect(() => {
        setName(userProfile.name || 'User');
        setLocation(userProfile.location || 'Unknown Location');
        setGoal(userProfile.goal || 'Maintain');
        setDiet(userProfile.diet || 'Any');
        setCalories(userProfile.calories || 2100);
        setAllergies(userProfile.allergies || 'None');
        setAge(userProfile.age || '--');
        setHeight(userProfile.height || '--');
        setWeight(userProfile.weight || '--');
    }, [userProfile]);

    const handleSave = () => {
        const updatedProfile = {
            ...userProfile,
            name,
            location,
            goal,
            diet,
            calories: parseInt(String(calories)),
            allergies,
            age,
            height,
            weight
        };
        onUpdateProfile(updatedProfile);
        setIsEditing(false);
    };

    const toggleEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
    };

    // Helper to format name display
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    const displayGoal = goal.replace('_', ' ');

    return (
        <div className="bg-[#f9f8f4] font-display text-[#0f1b0e] min-h-screen">
            <div className="relative flex h-full w-full flex-col max-w-md mx-auto overflow-x-hidden pb-8">
                {/* Header */}
                <div className="flex items-center p-6 justify-between sticky top-0 z-10 bg-[#f9f8f4]/95 backdrop-blur-sm">
                    <div className="flex items-center gap-3 flex-1 text-left">
                        <button
                            onClick={onBack}
                            className="flex items-center justify-center -ml-2 p-2 rounded-full text-[#0f1b0e] hover:bg-black/5 transition-colors"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Profile</h2>
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            onClick={toggleEdit}
                            className={`flex items-center justify-center rounded-full size-10 shadow-[0_4px_20px_-2px_rgba(27,33,26,0.05)] transition-colors ${isEditing ? 'bg-[#40e830] text-white hover:bg-[#32d625]' : 'bg-[#ffffff] text-[#0f1b0e] hover:bg-gray-50'}`}
                        >
                            <span className="material-symbols-outlined">{isEditing ? 'check' : 'edit'}</span>
                        </button>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="flex px-6 pt-4 pb-10 flex-col items-start w-full">
                    <div className="flex flex-col items-start justify-center w-full">
                        {isEditing ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-4xl font-extrabold leading-tight tracking-tight text-left text-[#0f1b0e] mb-2 bg-transparent border-b-2 border-gray-200 focus:border-[#40e830] outline-none placeholder:text-gray-300"
                                placeholder="Enter Name"
                            />
                        ) : (
                            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-left text-[#0f1b0e] mb-2">
                                {firstName}<br />{lastName}
                            </h1>
                        )}

                        <div className="flex items-center gap-1.5 opacity-80 bg-[#ffffff] px-3 py-1.5 rounded-full shadow-sm w-fit">
                            <span className="material-symbols-outlined text-sm text-[#40e830]">location_on</span>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="text-[#526651] text-sm font-medium uppercase tracking-wide bg-transparent border-none outline-none w-32"
                                />
                            ) : (
                                <p className="text-[#526651] text-sm font-medium uppercase tracking-wide">{location}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 mb-8">
                    {/* Goal Card */}
                    <div className="flex flex-col items-center gap-3 rounded-2xl p-5 bg-[#ffffff] shadow-[0_4px_20px_-2px_rgba(27,33,26,0.05)]">
                        <div className="flex items-center justify-center size-10 rounded-full bg-[#40e830]/10 text-[#40e830] mb-1">
                            <span className="material-symbols-outlined">balance</span>
                        </div>
                        <div className="text-center w-full">
                            <p className="text-[#526651] text-xs font-semibold uppercase tracking-wider mb-1">Goal</p>
                            {isEditing ? (
                                <select
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    className="text-[#0f1b0e] text-sm font-bold leading-tight capitalize bg-transparent outline-none w-full text-center"
                                >
                                    <option value="Fat Loss">Fat Loss</option>
                                    <option value="Maintain">Maintain</option>
                                    <option value="Muscle Gain">Muscle Gain</option>
                                </select>
                            ) : (
                                <p className="text-[#0f1b0e] text-lg font-bold leading-tight capitalize">{displayGoal}</p>
                            )}
                        </div>
                    </div>

                    {/* Diet Card */}
                    <div className="flex flex-col items-center gap-3 rounded-2xl p-5 bg-[#ffffff] shadow-[0_4px_20px_-2px_rgba(27,33,26,0.05)] border-2 border-[#40e830]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-12 h-12 bg-[#40e830]/10 rounded-full blur-xl"></div>
                        <div className="flex items-center justify-center size-10 rounded-full bg-[#40e830] text-white mb-1 shadow-lg shadow-[#40e830]/30">
                            <span className="material-symbols-outlined">spa</span>
                        </div>
                        <div className="text-center w-full">
                            <p className="text-[#526651] text-xs font-semibold uppercase tracking-wider mb-1">Diet Type</p>
                            {isEditing ? (
                                <select
                                    value={diet}
                                    onChange={(e) => setDiet(e.target.value)}
                                    className="text-[#0f1b0e] text-sm font-bold leading-tight bg-transparent outline-none w-full text-center"
                                >
                                    <option value="Any">Any</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                    <option value="Egg">Egg</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Keto">Keto</option>
                                </select>
                            ) : (
                                <p className="text-[#0f1b0e] text-lg font-bold leading-tight">{diet}</p>
                            )}
                        </div>
                    </div>

                    {/* Calorie Target Card */}
                    <div className="flex flex-col items-center gap-3 rounded-2xl p-5 bg-[#ffffff] shadow-[0_4px_20px_-2px_rgba(27,33,26,0.05)]">
                        <div className="flex items-center justify-center size-10 rounded-full bg-orange-100 text-orange-500 mb-1">
                            <span className="material-symbols-outlined">local_fire_department</span>
                        </div>
                        <div className="text-center w-full">
                            <div className="flex items-center justify-center gap-1">
                                <p className="text-[#526651] text-xs font-semibold uppercase tracking-wider mb-1">Daily Target</p>
                            </div>
                            {isEditing ? (
                                <div className="flex items-center justify-center gap-1">
                                    <input
                                        type="number"
                                        value={calories}
                                        onChange={(e) => setCalories(Number(e.target.value))}
                                        className="text-[#0f1b0e] text-lg font-bold leading-tight text-right w-16 bg-transparent border-b border-gray-200 outline-none"
                                    />
                                    <span className="text-[#0f1b0e] text-sm font-bold">kcal</span>
                                </div>
                            ) : (
                                <p className="text-[#0f1b0e] text-lg font-bold leading-tight">{calories} kcal</p>
                            )}
                        </div>
                    </div>
                </div>

                <h3 className="text-[#0f1b0e] text-lg font-bold leading-tight tracking-[-0.015em] px-6 pb-4 pt-2">Preferences</h3>
                <div className="flex flex-col gap-3 px-6">
                    <div className="group flex items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-[0_4px_20px_-2px_rgba(27,33,26,0.05)] w-full text-left">
                        <div className="flex items-center justify-center rounded-lg bg-red-50 text-red-500 shrink-0 size-12">
                            <span className="material-symbols-outlined">no_food</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-[#0f1b0e] text-base font-bold leading-normal">Allergies & Restrictions</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={allergies}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    className="text-[#526651] text-sm w-full bg-transparent border-b border-gray-100 outline-none"
                                />
                            ) : (
                                <p className="text-[#526651] text-sm">{allergies}</p>
                            )}
                        </div>
                    </div>

                    <div className="group flex items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-[0_4px_20px_-2px_rgba(27,33,26,0.05)] w-full text-left">
                        <div className="flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 shrink-0 size-12">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-[#0f1b0e] text-base font-bold leading-normal">Personal Info</p>
                            {isEditing ? (
                                <div className="flex gap-2 text-[#526651] text-sm items-center">
                                    <input value={age} onChange={e => setAge(e.target.value)} className="w-8 bg-transparent border-b border-gray-100 outline-none text-center" /> yrs,
                                    <input value={height} onChange={e => setHeight(e.target.value)} className="w-10 bg-transparent border-b border-gray-100 outline-none text-center" /> cm,
                                    <input value={weight} onChange={e => setWeight(e.target.value)} className="w-10 bg-transparent border-b border-gray-100 outline-none text-center" /> kg
                                </div>
                            ) : (
                                <p className="text-[#526651] text-sm">{age} yrs, {height}cm, {weight}kg</p>
                            )}
                        </div>
                    </div>


                </div>
                <div className="h-10"></div>
                <div className="fixed bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f9f8f4] to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
}
