import { useState, useEffect, useCallback } from 'react';
import { steps, defaultAnswers } from '../config/funnelConfig';

const STORAGE_KEY_STEP = 'hexafilm_funnel_step';
const STORAGE_KEY_ANSWERS = 'hexafilm_funnel_answers';
const STORAGE_KEY_PHASE = 'hexafilm_funnel_phase';

export type Phase = 'funnel' | 'qualifying' | 'booking';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useFunnelState() {
  const [currentStep, setCurrentStep] = useState<number>(() =>
    loadFromStorage(STORAGE_KEY_STEP, 0),
  );
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    loadFromStorage(STORAGE_KEY_ANSWERS, { ...defaultAnswers }),
  );
  const [phase, setPhase] = useState<Phase>(() =>
    loadFromStorage(STORAGE_KEY_PHASE, 'funnel' as Phase),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STEP, JSON.stringify(currentStep));
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PHASE, JSON.stringify(phase));
  }, [phase]);

  const setAnswer = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const step = steps[currentStep];
    const newErrors: Record<string, string> = {};

    if (step.type === 'text' && step.fields) {
      for (const field of step.fields) {
        const value = (answers[field.key] ?? '').trim();
        if (field.required && !value) {
          newErrors[field.key] = 'This field is required';
        } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field.key] = 'Enter a valid email address';
        } else if (field.type === 'url' && value && !/^https?:\/\/.+\..+/.test(value)) {
          newErrors[field.key] = 'Enter a valid URL (https://…)';
        }
      }
    }

    if (step.type === 'choice' && step.answerKey && !answers[step.answerKey]) {
      newErrors[step.answerKey] = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [currentStep, answers]);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setErrors({});
      setCurrentStep(index);
    }
  }, []);

  const resetFunnel = useCallback(() => {
    setCurrentStep(0);
    setAnswers({ ...defaultAnswers });
    setPhase('funnel');
    setErrors({});
    localStorage.removeItem(STORAGE_KEY_STEP);
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_PHASE);
  }, []);

  return {
    currentStep,
    answers,
    errors,
    phase,
    setPhase,
    setAnswer,
    validate,
    goToStep,
    resetFunnel,
    isLastStep: currentStep === steps.length - 1,
    canGoPrev: currentStep > 0,
    totalSteps: steps.length,
  };
}
