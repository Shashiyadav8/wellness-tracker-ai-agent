import React, { createContext, useContext, useState, useEffect } from 'react';

const WellnessContext = createContext();

const STORAGE_KEY = 'wellness_tracker_data_v1';

const getInitialState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Basic check to see if it's the same day, otherwise reset daily progress
            // For MVP simplicity, we might just keep it or reset it.
            // Let's implement day reset logic.
            const today = new Date().toDateString();
            if (parsed.lastDate !== today) {
                return {
                    ...parsed,
                    lastDate: today,
                    calories: 0,
                    water: 0,
                    steps: 0,
                    sleep: 0,
                    foodLog: [] // Keep history? MVP: Just daily reset
                };
            }
            return parsed;
        } catch (e) {
            console.error("Failed to parse saved data", e);
        }
    }
    return {
        lastDate: new Date().toDateString(),
        calories: 0,
        water: 0,
        steps: 0,
        sleep: 0,
        foodLog: [],
        goals: {
            calories: 2000,
            water: 2500, // ml
            steps: 10000,
            sleep: 8
        }
    };
};

export const WellnessProvider = ({ children }) => {
    const [data, setData] = useState(getInitialState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const addFood = (foodItem) => {
        setData(prev => ({
            ...prev,
            calories: prev.calories + Number(foodItem.calories),
            foodLog: [foodItem, ...prev.foodLog]
        }));
    };

    const addWater = (amount) => {
        setData(prev => ({
            ...prev,
            water: prev.water + amount
        }));
    };

    const updateSteps = (steps) => {
        setData(prev => ({
            ...prev,
            steps: Number(steps)
        }));
    };

    const updateSleep = (hours) => {
        setData(prev => ({
            ...prev,
            sleep: Number(hours)
        }));
    };

    const getProgress = (metric) => {
        const value = data[metric] || 0;
        const goal = data.goals[metric] || 1;
        return { value, goal, percentage: Math.min(100, Math.round((value / goal) * 100)) };
    };

    return (
        <WellnessContext.Provider value={{ data, addFood, addWater, updateSteps, updateSleep, getProgress }}>
            {children}
        </WellnessContext.Provider>
    );
};

export const useWellness = () => useContext(WellnessContext);
