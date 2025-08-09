# Scrollable Dashboard Layout Guide

To ensure all dashboard sections (children, entries, notes) are scrollable and never push the bottom off screen, use the following structure in your Django template:

## 1. Main Dashboard Wrapper
Replace:
```html
<div class="overflow-hidden h-screen flex flex-col" style="height: calc(100vh - 80px); min-height: 0;">
```
With:
```html
<div class="h-screen min-h-0 flex flex-col" style="height: 100vh;">
```

## 2. Desktop Grid Row
Replace:
```html
<div class="hidden md:grid md:grid-cols-12 gap-4 lg:gap-6 h-full">
```
With:
```html
<div class="hidden md:grid md:grid-cols-12 gap-4 lg:gap-6 h-full min-h-0">
```

## 3. Each Column
Replace (for each column):
```html
<div class="md:col-span-2 lg:col-span-2 xl:col-span-2 h-full">
```
With:
```html
<div class="md:col-span-2 lg:col-span-2 xl:col-span-2 h-full min-h-0 flex flex-col">
```
Do the same for the center and right columns:
```html
<div class="md:col-span-6 lg:col-span-6 xl:col-span-6 h-full">
```
→
```html
<div class="md:col-span-6 lg:col-span-6 xl:col-span-6 h-full min-h-0 flex flex-col">
```
And
```html
<div class="md:col-span-4 lg:col-span-4 xl:col-span-4 h-full">
```
→
```html
<div class="md:col-span-4 lg:col-span-4 xl:col-span-4 h-full min-h-0 flex flex-col">
```

## 4. Scrollable Content Containers
Replace (in each column):
```html
<div class="space-y-3 overflow-y-auto" style="max-height: 40vh; min-height: 0;">
```
With:
```html
<div class="space-y-3 flex-1 min-h-0 overflow-y-auto" style="min-height: 0;">
```
And for entries/notes:
```html
<div class="space-y-4 flex-1 min-h-0 overflow-y-auto">
```
If you see `max-height: 40vh;`, you can remove it for now.

---

Apply these changes and your dashboard sections will scroll as expected. If you need to debug further, ensure all parent containers use `min-h-0` and `flex-col` as shown above.
