# 🏥 Autonomous AI Pharmacy System

An autonomous, backend-driven pharmacy system that safely processes medicine orders, predicts refills, personalizes user insights, optimizes inventory using Operations Research, and executes actions automatically.

The project is built with a **safety-first, explainable design**, avoiding black-box ML and instead relying on computational statistics and deterministic optimization logic.

## 🚀 Problem Statement

Traditional pharmacy systems are reactive:

- Orders are processed **manually**
- Stockouts are discovered **too late** 
- Refills depend on **user initiative**
- Inventory decisions are **heuristic**

This leads to missed medications, overstocking, and inefficiency.

## 💡 Our Solution

We built an autonomous pharmacy backend that:

- ✅ Validates orders for **safety and policy compliance**
- ✅ Stores verified order history **securely**
- ✅ Predicts medicine refills **proactively**
- ✅ Personalizes insights from **user behavior**
- ✅ Optimizes inventory using **OR principles**
- ✅ Executes actions **autonomously** (mocked)

**All decisions are explainable, deterministic, and testable.**

## 🧠 System Architecture (Phase-wise)

### 🟦 Phase 2 – Order Safety Logic
- Prescription validation
- Stock availability checks
- Approve / reject decisions

### 🟦 Phase 3 – Backend Integration
- Firebase Cloud Functions
- Firestore order persistence
- Emulator-based testing

### 🟦 Phase 4 – Refill Prediction (Computational Statistics)
- Remaining supply estimation
- Refill urgency detection

### 🟦 Phase 5 – Personalization
- Frequent medicines
- Average refill cycles
- Chronic usage indicators

### 🟦 Phase 6 – Inventory Optimization (Operations Research)
- Reorder Point (ROP)
- Safety stock
- Recommended order quantity

### 🟦 Phase 7 – Autonomous Execution
- Automatic reorder decision
- Mock fulfillment action
