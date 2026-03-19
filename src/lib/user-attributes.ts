// lib/user-attributes.ts

import z from "zod";

// ── Conditions ──────────────────────────────────────────
export const CONDITIONS = [
  { key: "IBS", label: "IBS", emoji: "🫃" },
  { key: "BLOATING", label: "Bloating", emoji: "💨" },
  { key: "SIBO", label: "SIBO", emoji: "🦠" },
  { key: "CROHNS", label: "Crohn's Disease", emoji: "🔴" },
  { key: "FOOD_INTOLERANCE", label: "Food Intolerances", emoji: "🚫" },
  { key: "ACID_REFLUX", label: "Acid Reflux", emoji: "🔥" },
  { key: "CONSTIPATION", label: "Constipation", emoji: "😣" },
  { key: "FATIGUE_AFTER_EATING", label: "Fatigue After Eating", emoji: "😴" },
  { key: "BRAIN_FOG", label: "Brain Fog", emoji: "🌫️" },
  { key: "NOT_SURE", label: "Not sure yet", emoji: "🤷" },
  { key: "JUST_CURIOUS", label: "Just curious about my gut", emoji: "👀" },
] as const;

export type ConditionKey = (typeof CONDITIONS)[number]["key"];

export const ConditionKeySchema = z.enum(
  CONDITIONS.map((c) => c.key) as [string, ...string[]],
);

// ── Goals ───────────────────────────────────────────────
export const GOALS = [
  {
    key: "FIND_TRIGGERS",
    label: "Find my trigger foods",
    description: "Identify which foods cause your worst symptoms",
    emoji: "🎯",
    category: "insight",
  },
  {
    key: "REDUCE_BLOATING",
    label: "Reduce bloating and discomfort",
    description: "Feel comfortable after meals again",
    emoji: "💨",
    category: "relief",
  },
  {
    key: "ELIMINATION_DIET",
    label: "Try an elimination diet",
    description: "Follow a structured low-FODMAP or similar program",
    emoji: "📋",
    category: "program",
  },
  {
    key: "UNDERSTAND_MICROBIOME",
    label: "Understand my microbiome",
    description: "Learn how your gut bacteria affect your health",
    emoji: "🦠",
    category: "education",
  },
  {
    key: "WORK_WITH_COACH",
    label: "Work with a dietitian",
    description: "Get personalised guidance from a certified professional",
    emoji: "👨‍⚕️",
    category: "coaching",
  },
  {
    key: "DOCTOR_PREP",
    label: "Prepare for a doctor's appointment",
    description: "Build a symptom report to share with your GP or specialist",
    emoji: "📄",
    category: "medical",
  },
  {
    key: "FEEL_NORMAL",
    label: "Just feel normal after eating again",
    description: "Get back to eating without anxiety or discomfort",
    emoji: "😌",
    category: "wellbeing",
  },
  {
    key: "MANAGE_ENERGY",
    label: "Manage my energy levels",
    description: "Stop the afternoon crashes and post-meal fatigue",
    emoji: "⚡",
    category: "energy",
  },
  {
    key: "IDENTIFY_SAFE_FOODS",
    label: "Build a list of safe foods",
    description: "Know exactly what your gut loves and trusts",
    emoji: "🛡️",
    category: "insight",
  },
] as const;

export type GoalKey = (typeof GOALS)[number]["key"];
export type GoalCategory = (typeof GOALS)[number]["category"];

export const GoalKeySchema = z.enum(
  GOALS.map((g) => g.key) as [string, ...string[]],
);

// ── Helper functions ────────────────────────────────────

// Get label for display from a stored key
export const getConditionLabel = (key: string) =>
  CONDITIONS.find((c) => c.key === key)?.label ?? key;

export const getGoalLabel = (key: string) =>
  GOALS.find((g) => g.key === key)?.label ?? key;

// Get all goals in a specific category
export const getGoalsByCategory = (category: GoalCategory) =>
  GOALS.filter((g) => g.category === category);

// Check if a user's goals suggest they'd benefit from a coach
export const isCoachRelevant = (goals: string[]) =>
  goals.includes("WORK_WITH_COACH") || goals.includes("DOCTOR_PREP");

// Check if a user's goals suggest they'd benefit from a program
export const isProgramRelevant = (goals: string[]) =>
  goals.includes("ELIMINATION_DIET") || goals.includes("FIND_TRIGGERS");
