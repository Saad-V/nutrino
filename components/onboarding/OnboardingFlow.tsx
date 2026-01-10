'use client';

import { useState } from 'react';
import Step1Basics from './Step1Basics';
import Step2Goals from './Step2Goals';
import Step3Environment from './Step3Environment';

interface OnboardingFlowProps {
    onComplete: (data?: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Female',
        height: '',
        weight: '',
        goal: 'fat_loss',
        diet: 'Non-veg',
        location: '',
        allergies: ''
    });

    const updateData = (newData: any) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleComplete = () => {
        // Save to localStorage
        localStorage.setItem('nutrino_user_profile', JSON.stringify(formData));
        localStorage.setItem('nutrino_onboarding_complete', 'true');
        onComplete(formData);
    };

    return (
        <div className="w-full max-w-md mx-auto h-full min-h-screen bg-background relative overflow-hidden shadow-2xl">
            {step === 1 && (
                <Step1Basics
                    data={formData}
                    onUpdate={updateData}
                    onNext={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <Step2Goals
                    data={formData}
                    onUpdate={updateData}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <Step3Environment
                    data={formData}
                    onUpdate={updateData}
                    onComplete={handleComplete}
                    onBack={() => setStep(2)}
                />
            )}
        </div>
    );
}
