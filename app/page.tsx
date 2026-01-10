'use client';


import { useEffect, useState } from 'react';
import { calculateDailyTargets, generateMealSuggestions } from './actions';
import WelcomeScreen from '../components/WelcomeScreen';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import Dashboard from '../components/Dashboard';
import AddFoodChoice from '../components/AddFoodChoice';
import AnalysisPage from '../components/AnalysisPage';
import ManualEntry from '../components/ManualEntry';
import MealSuggestions from '../components/MealSuggestions';

import Notifications from '../components/Notifications';
import Profile from '../components/Profile';
import SideMenu from '../components/SideMenu';

import MealDetails from '../components/MealDetails';

// Basic Meal Type for storage
interface LoggedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: number;
}

export default function Home() {
  const [view, setView] = useState<'loading' | 'welcome' | 'onboarding' | 'dashboard' | 'add-food' | 'analysis-page' | 'manual-entry' | 'suggestions' | 'meal-details' | 'notifications' | 'profile'>('loading');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data State
  const [dailyLogs, setDailyLogs] = useState<Record<string, LoggedMeal[]>>({});
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [userProfile, setUserProfile] = useState<any>({});

  // Analysis State
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisImage, setAnalysisImage] = useState<string>('');
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  // Suggestions Cache State
  const [mealSuggestions, setMealSuggestions] = useState<any[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsFilter, setSuggestionsFilter] = useState('Balanced');

  // Import locally or move import to top if not already there (it's not, need to import generateMealSuggestions) 
  // Wait, I need to add the import first or do it in the same file.
  // I'll assume I can add the action import in a separate step or just do it now if I can edit the top.
  // I will just add the state here and then add the import and the fetch function in subsequent edits to be safe.

  // Actually, I'll add the fetch function here too.
  // I need `generateMealSuggestions` from `./actions`. 
  // I'll double check imports in the file view. It's not imported yet.

  // Let's just add the states first.

  // Targets based on Profile
  const getTargets = () => {
    const cals = userProfile.calories ? parseInt(userProfile.calories) : 2100;

    // Use stored smart macros if available, otherwise fallback to rough split
    const p = userProfile.protein ? parseInt(userProfile.protein) : Math.round(cals * 0.25 / 4);
    const c = userProfile.carbs ? parseInt(userProfile.carbs) : Math.round(cals * 0.45 / 4);
    const f = userProfile.fats ? parseInt(userProfile.fats) : Math.round(cals * 0.30 / 9);

    return {
      calories: cals,
      protein: p,
      carbs: c,
      fats: f
    };
  };

  const TARGETS = getTargets();

  useEffect(() => {
    // Check localStorage for onboarding status & logs
    const isOnboardingComplete = localStorage.getItem('nutrino_onboarding_complete') === 'true';
    const savedLogs = localStorage.getItem('nutrino_daily_logs');
    const savedProfile = localStorage.getItem('nutrino_user_profile');

    if (savedLogs) {
      setDailyLogs(JSON.parse(savedLogs));
    }
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    if (isOnboardingComplete) {
      setView('dashboard');
    } else {
      setView('welcome');
    }
  }, []);

  // Persistence Helper
  const updateLogs = (newLogs: Record<string, LoggedMeal[]>) => {
    setDailyLogs(newLogs);
    localStorage.setItem('nutrino_daily_logs', JSON.stringify(newLogs));
  };

  const getLogDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getCurrentDayLogs = () => {
    const key = getLogDateKey(currentDate);
    return dailyLogs[key] || [];
  };

  const calculateMacros = () => {
    const logs = getCurrentDayLogs();
    const current = logs.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return {
      calories: { current: current.calories, target: TARGETS.calories },
      protein: { current: current.protein, target: TARGETS.protein },
      carbs: { current: current.carbs, target: TARGETS.carbs },
      fats: { current: current.fats, target: TARGETS.fats }
    };
  };

  // Nav Handlers
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Add Meal Logic
  const addMealToLog = (name: string, calories: number, protein: number = 0, carbs: number = 0, fats: number = 0) => {
    const key = getLogDateKey(currentDate);
    const newMeal: LoggedMeal = {
      id: Date.now().toString(),
      name,
      calories,
      protein,
      carbs,
      fats,
      timestamp: Date.now()
    };

    const updatedDayLogs = [...(dailyLogs[key] || []), newMeal];
    updateLogs({
      ...dailyLogs,
      [key]: updatedDayLogs
    });
  };

  const handleStartOnboarding = () => {
    setView('onboarding');
  };

  const handleOnboardingComplete = async (data?: any) => {
    if (data) {
      // 1. Initial save with user inputs
      handleUpdateProfile(data);

      // 2. Calculate Smart Targets
      try {
        const result = await calculateDailyTargets(data);
        if (result.success || result.data) {
          const smartProfile = {
            ...data,
            calories: result.data.calories,
            // Store macros as well if needed by Profile, or just use them for calculations
            protein: result.data.protein,
            carbs: result.data.carbs,
            fats: result.data.fats,
            targetExplanation: result.data.explanation
          };
          handleUpdateProfile(smartProfile);
        }
      } catch (e) {
        console.error("Failed to calculate targets", e);
      }
    }
    setView('dashboard');
  };

  const handleAddFood = () => {
    setView('add-food');
  };

  const handleAddFoodBack = () => {
    setView('dashboard');
  };

  const handleFetchSuggestions = async (filter: string) => {
    setSuggestionsLoading(true);
    setSuggestionsFilter(filter);
    try {
      const result = await generateMealSuggestions(userProfile, filter);
      if (result.success && result.data.suggestions) {
        setMealSuggestions(result.data.suggestions);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const handleSuggestMeal = () => {
    setView('suggestions');
    // Initial fetch if empty
    if (mealSuggestions.length === 0) {
      handleFetchSuggestions('Balanced');
    }
  };

  const handleSuggestionsBack = () => {
    setView('dashboard');
  };

  const handleAddSuggestion = (mealName: string, calories: number) => {
    // Add suggestion to log (Estimating macros roughly if not provided, for now simpler is better)
    // For demo purposes, let's assume balanced ratios for suggestions if exact macros aren't passed
    // But since the suggestion cards DO have macros hidden or implies, let's just approximate for now to make the bar move.
    // 450kcal -> approx 25g P, 40g C, 20g F
    addMealToLog(mealName, calories, Math.round(calories * 0.25 / 4), Math.round(calories * 0.45 / 4), Math.round(calories * 0.3 / 9));
    setView('dashboard');
  };

  const handleSelectMeal = (mealName: string) => {
    setSelectedMeal(mealName);
    setView('meal-details');
  };

  const handleMealDetailsBack = () => {
    setView('suggestions');
  };

  const handleMealDetailsAddLog = () => {
    // Hardcoded add for the demo Grilled Paneer
    // 450 kcal, 22g P, 30g C, 15g F
    addMealToLog('Grilled Paneer w/ Veg', 450, 22, 30, 15);
    setView('dashboard');
  };

  // Called when AddFoodChoice finishes analyzing
  const handleAnalysisComplete = (result: any, imageSrc: string) => {
    setAnalysisResult(result);
    setAnalysisImage(imageSrc);
    setView('analysis-page');
  };

  const handleManualEntry = () => {
    setView('manual-entry');
  };

  const handleManualEntryBack = () => {
    setView('add-food');
  };

  const handleManualEntryAdd = () => {
    // In a full implementation, we'd pass the actual manual entry data up.
    // For now, let's assume a generic "Manual Entry" of 400kcal.
    addMealToLog('Manual Entry', 400, 20, 40, 15);
    setView('dashboard');
  };

  // Called from AnalysisPage when back button is clicked
  const handleAnalysisBack = () => {
    setView('add-food');
  };

  // Called when user confirms the meal in AnalysisPage
  const handleSaveMeal = () => {
    if (analysisResult) {
      // Parse analysis result safe for numbers or strings (e.g. 450 or "450 kcal")
      const parseVal = (val: any) => {
        if (typeof val === 'number') return val;
        return parseInt(String(val || '0').replace(/[^0-9]/g, '') || '0');
      };

      const cals = parseVal(analysisResult.calories);
      const p = parseVal(analysisResult.protein);
      const c = parseVal(analysisResult.carbs);
      const f = parseVal(analysisResult.fats);

      addMealToLog(analysisResult.foodName || 'Analyzed Meal', cals, p, c, f);
    }
    setView('dashboard');
    setAnalysisResult(null);
    setAnalysisImage('');
  };

  const handleNotifications = () => {
    setView('notifications');
  };

  const handleNotificationsBack = () => {
    setView('dashboard');
  };

  const handleProfile = () => {
    setView('profile');
  };

  const handleProfileBack = () => {
    setView('dashboard');
  };

  const handleUpdateProfile = (newProfile: any) => {
    setUserProfile(newProfile);
    localStorage.setItem('nutrino_user_profile', JSON.stringify(newProfile));
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuNavigate = (newView: any) => {
    setView(newView);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('nutrino_onboarding_complete');
    localStorage.removeItem('nutrino_user_profile');
    localStorage.removeItem('nutrino_daily_logs');
    setIsMenuOpen(false);
    setView('welcome');
  };

  if (view === 'loading') {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading...</div>;
  }

  if (view === 'welcome') {
    return <WelcomeScreen onStart={handleStartOnboarding} />;
  }

  if (view === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (view === 'add-food') {
    return <AddFoodChoice onBack={handleAddFoodBack} onAnalysisComplete={handleAnalysisComplete} onManualEntry={handleManualEntry} />;
  }

  if (view === 'manual-entry') {
    return <ManualEntry onBack={handleManualEntryBack} onAdd={handleManualEntryAdd} />;
  }

  if (view === 'suggestions') {
    return (
      <MealSuggestions
        userProfile={userProfile}
        onBack={handleSuggestionsBack}
        onAdd={handleAddSuggestion}
        onSelectMeal={handleSelectMeal}
        suggestions={mealSuggestions}
        loading={suggestionsLoading}
        filter={suggestionsFilter}
        onFetch={handleFetchSuggestions}
      />
    );
  }

  if (view === 'meal-details') {
    return <MealDetails mealName={selectedMeal || ''} onBack={handleMealDetailsBack} onAddLog={handleMealDetailsAddLog} />;
  }

  if (view === 'analysis-page') {
    return (
      <AnalysisPage
        imageSrc={analysisImage}
        analysisResult={analysisResult}
        onBack={handleAnalysisBack}
        onSave={handleSaveMeal}
      />
    );
  }

  if (view === 'notifications') {
    return <Notifications onBack={handleNotificationsBack} />;
  }

  if (view === 'profile') {
    return (
      <Profile
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onBack={handleProfileBack}
      />
    );
  }

  return (
    <>
      {isMenuOpen && (
        <SideMenu
          onClose={handleMenuClose}
          onNavigate={handleMenuNavigate}
          onLogout={handleLogout}
          userProfile={userProfile}
        />
      )}
      <Dashboard
        onAddFood={handleAddFood}
        onSuggestMeal={handleSuggestMeal}
        currentDate={currentDate}
        macros={calculateMacros()}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        onNotifications={handleNotifications}
        onProfile={handleProfile}
        onMenu={handleMenuToggle}
        isMenuOpen={isMenuOpen}
        userProfile={userProfile}
      />
    </>
  );
}
