# 🚀 Quick Start Guide - Exercise 28

## Chạy Application

### 1. Cài đặt Dependencies
```bash
cd my-app
npm install
```

### 2. Khởi động Development Server
```bash
ng serve
```

### 3. Mở Browser
```
http://localhost:4200/ex28
hoặc
http://localhost:4200/bitcoin
```

---

## 📸 Expected Result

### Loading State
```
💰 Bitcoin Price Index
Real-time cryptocurrency prices from Coindesk API
Exercise 28 - Best Practices Applied ✅

[LOADING SPINNER]
Loading Bitcoin data from Coindesk...
```

### Success State
```
💰 Bitcoin Price Index
Last Updated: Feb 1, 2026 12:00:00 UTC

┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ $ USD               │  │ £ GBP               │  │ € EUR               │
│ 45,123.4567         │  │ 35,123.4567         │  │ 40,123.4567         │
│ United States Dollar│  │ British Pound       │  │ Euro                │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘

[🔄 Refresh Data]

✅ Best Practices Applied:
  ✅ Memory leak protection (takeUntil pattern)
  ✅ Proper type safety (no 'any' types)
  ✅ Loading state management
  ✅ Error handling with retry
  ✅ OnDestroy lifecycle cleanup
  ✅ Direct Coindesk API call
```

### Error State
```
⚠️ Failed to load Bitcoin data: Network error

[🔄 Retry]
```

---

## 🧪 Chạy Tests

```bash
npm test
```

Expected output:
```
✅ Bitcoin Component - Exercise 28
  ✅ should create the component
  ✅ should load Bitcoin data on init
  ✅ should handle errors properly
  ✅ should set loading state during data fetch
  ✅ should cleanup subscriptions on destroy
  ✅ should clear error message when reloading

Tests: 6 passed (6 total)
```

---

## 🔧 Verify Implementation

### Check Memory Leak Protection
1. Navigate to `/ex28`
2. Open Chrome DevTools → Performance
3. Start recording
4. Navigate away and back 10 times
5. Check memory usage → Should be stable (no increase)

### Check Type Safety
1. Open `bitcoin.ts`
2. Check no `any` types used
3. All properties properly typed

### Check Loading States
1. Navigate to `/ex28`
2. Should see loading spinner
3. Then see data cards
4. Click refresh → See loading again

### Check Error Handling
1. Disable internet
2. Navigate to `/ex28`
3. Should see error message with retry button
4. Enable internet
5. Click retry → Should load data

---

## 📁 Files Modified

```
my-app/src/app/
├── bitcoin/
│   ├── bitcoin.ts              ✅ Updated (takeUntil pattern)
│   ├── bitcoin.html            ✅ Updated (loading/error states)
│   ├── bitcoin.css             ✅ Updated (modern UI)
│   └── bitcoin.spec.ts         ✅ Updated (proper tests)
├── myservices/
│   └── bitcoin.ts              ✅ Updated (Coindesk method)
└── app-routing-module.ts       ✅ Updated (ex28 route)
```

---

## ✅ Verification Checklist

- [ ] Application runs without errors
- [ ] Navigate to `/ex28` works
- [ ] Loading spinner shows while fetching
- [ ] Bitcoin prices display correctly
- [ ] Refresh button works
- [ ] Error handling works (test with network off)
- [ ] Tests pass (npm test)
- [ ] No console errors
- [ ] Memory doesn't increase on navigation
- [ ] Responsive design works on mobile

---

## 🎯 What to Look For

### UI Features
- ✅ Purple gradient background
- ✅ Loading spinner animation
- ✅ Three price cards (USD, GBP, EUR)
- ✅ Last updated timestamp
- ✅ Refresh button
- ✅ Best practices info section
- ✅ Error message with retry

### Technical Features
- ✅ Direct Coindesk API call (check Network tab)
- ✅ 3 retries on failure
- ✅ No memory leaks (check Performance)
- ✅ Type-safe code (check TypeScript)
- ✅ Clean console (no errors)

---

## 🐛 Troubleshooting

### Issue: API Call Fails
**Solution**: Check internet connection or API status
```
Error: Failed to load Bitcoin data: Network error
```

### Issue: Component Not Found
**Solution**: Check routing configuration
```typescript
// app-routing-module.ts
{ path: 'ex28', component: Bitcoin }
```

### Issue: Tests Fail
**Solution**: Check Vitest configuration
```bash
npm install --save-dev vitest @vitest/ui
```

### Issue: Memory Leaks
**Solution**: Check takeUntil implementation
```typescript
// bitcoin.ts
.pipe(takeUntil(this.destroy$))
```

---

## 📚 Reference

- **Architecture Analysis**: [ANGULAR_ARCHITECTURE_ANALYSIS.md](../ANGULAR_ARCHITECTURE_ANALYSIS.md)
- **Exercise Documentation**: [EXERCISE_28_README.md](../EXERCISE_28_README.md)
- **Before/After Report**: [EXERCISE_28_REPORT.md](../EXERCISE_28_REPORT.md)
- **Summary**: [EXERCISE_28_SUMMARY.md](../EXERCISE_28_SUMMARY.md)

---

## 🎉 Success!

If you see:
- ✅ Bitcoin prices loading
- ✅ Loading spinner working
- ✅ Error handling working
- ✅ Tests passing
- ✅ No console errors

**Congratulations! Exercise 28 is working perfectly! 🎊**

---

**Quick Start Guide Created**: February 1, 2026  
**Version**: 1.0  
**Status**: Ready to Run ✅
