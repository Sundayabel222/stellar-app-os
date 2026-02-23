# Common Issues & Solutions

## 🔴 Potential Issues to Watch For

### 1. **Radix UI Dialog Not Found**

**Error:**
```
Cannot find module '@radix-ui/react-dialog'
```

**Solution:**
```bash
# These dependencies were added to the project structure
# But may need explicit installation:
pnpm add @radix-ui/react-dialog @radix-ui/react-primitive
```

**Status:** Already included in project

---

### 2. **Tailwind Stellar Colors Not Recognized**

**Error:**
```
text-stellar-blue is not a known color
```

**Solution:**
✅ Already configured in `globals.css`
- Colors are defined in CSS custom properties
- Tailwind theme automatically includes them
- No additional config needed

**Status:** No action needed

---

### 3. **TypeScript Errors: Unknown Type**

**Error:**
```
Type 'WalletType' is not assignable to type 'const'
```

**Solution:**
✅ Fixed by using `as const` assertion in the map:
```tsx
{(['freighter', 'albedo'] as const).map((walletType) => {
```

**Status:** Already fixed ✅

---

### 4. **Modal Not Accessible**

**Error/Issue:**
- Focus trap not working
- Can tab out of modal

**Solution:**
✅ Using Radix UI Dialog which handles:
- Focus trap automatically
- Keyboard management
- Aria attributes

**Status:** Built-in to Dialog Primitive ✅

---

### 5. **console.error: Hydration Mismatch**

**Potential Issue:**
- Component uses `useEffect` for client-only code
- 'use client' directive is present

**Status:**
✅ 'use client' directive is at top of file
✅ Window checks are in place (`if (typeof window !== 'undefined')`)
✅ No hydration issues expected

---

### 6. **useWalletContext is Undefined**

**Error:**
```
useWalletContext is not defined
```

**Solution:**
- Verify WalletContext exists: `contexts/WalletContext.tsx`
- Component imports it correctly
- Verify the context provider wraps the app

**Status:**
✅ Already implemented in the project
✅ Connect function matches useWallet hook

---

### 7. **Lint Error: Unused Imports**

**Potential Warning:**
```
'Wallet' is imported but never used
```

**Status:**
✅ Fixed - Wallet icon is used in WALLET_ICONS constant

---

### 8. **ESLint react-hooks Rule Violation**

**Potential Warning:**
```
Missing dependency in useCallback dependency array
```

**What to check:**
- Dependencies list includes: `[connect, onOpenChange, onSuccess, wallet?.publicKey]`
- Each useCallback has proper dependencies
- useEffect dependencies are correct

**Status:**
✅ All dependencies properly listed

---

## 🟡 Common Testing Issues

### Issue: Modal Not Opening

**Check:**
1. Component is imported correctly
2. `isOpen` prop is true
3. `onOpenChange` handler is defined
4. Dialog primitive is not hidden by CSS

**Fix:**
```tsx
// Ensure parent component has:
const { isOpen, open, close } = useWalletModal();

<button onClick={open}>Connect</button>
<WalletModal isOpen={isOpen} onOpenChange={close} />
```

---

### Issue: Freighter Connection Fails

**Possible Causes:**
1. Freighter extension not installed
2. Freighter is disabled in browser
3. Window object not accessible
4. Network issues

**What Component Does:**
- Shows "Install Extension" button if not installed ✅
- Shows user-friendly error messages ✅
- Handles timeout gracefully ✅

---

### Issue: Albedo Connection Blocked

**Possible Causes:**
1. Popup blocker preventing window.open()
2. Browser security settings
3. Third-party cookie restrictions

**What Component Does:**
- Detects popup blocked error ✅
- Shows specific error message ✅
- Suggests allowing popups ✅

---

### Issue: Styling Issues on Mobile

**Check:**
1. Modal max-width: `max-w-md` (448px)
2. Padding: proper responsive padding
3. Font sizes: readable on small screens
4. Touch targets: 44px minimum

**Status:**
✅ All implemented

---

## 🟢 Expected Behaviors

### Modal Opens
```
User clicks "Connect" → Modal fades in (100ms)
```

### User Selects Wallet
```
User clicks card → Loading spinner appears
Freighter: Browser wallet opens
Albedo: Popup window appears
```

### Connection Success
```
User confirms → Success animation (1.5s) → Modal closes
```

### Connection Error
```
Error occurs → Message displays (red bg) → User can retry
```

### Close Modal
```
User presses ESC / clicks X / clicks outside → Modal closes
(Does NOT close if connection in progress)
```

---

## 🔧 Debugging Tips

### Enable Debug Logging
Add to WalletModal.tsx:
```tsx
// For debugging wallet connections
const handleWalletConnect = useCallback(
  async (walletType: WalletType) => {
    console.log('Connecting to:', walletType);
    // ... rest of code
  },
  [...]
);
```

### Check Elements
In browser DevTools:
1. Open Elements Inspector
2. Find `[data-radix-dialog-content]`
3. Check for proper ARIA attributes
4. Verify CSS classes are applied

### Test Keyboard
Press these keys in order:
1. `Tab` - Should highlight first element
2. `Tab` - Should move through elements
3. `Escape` - Should close (when not loading)
4. `Enter`/`Space` on card - Should select wallet

---

## 📋 Verification Checklist

Before Submitting PR:

### Code Quality
- [ ] No TypeScript errors: `pnpm build`
- [ ] Linting passes: `pnpm lint`
- [ ] Formatting passes: `pnpm format:check`

### Functionality
- [ ] Modal opens and closes
- [ ] Freighter selection works (with detection)
- [ ] Albedo selection works
- [ ] Errors display correctly
- [ ] Success state shows
- [ ] Help link opens in new tab

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus trap active in modal
- [ ] Screen reader announces changes
- [ ] Color contrast sufficient (WCAG AA)

### Responsive
- [ ] Mobile (375px min)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

---

## 📞 Support

If you encounter issues:

1. **Check the error message** - Most are user-friendly
2. **Review this guide** - Common solutions listed
3. **Check browser console** - Look for JavaScript errors
4. **Test in different browser** - Rule out browser-specific issues
5. **Review git diff** - Verify all code was added correctly

---

## 🎓 Quick Reference

**Component Location:**
```
components/organisms/WalletModal/
```

**Key Files:**
- `WalletModal.tsx` - Main component
- `useWalletModal.ts` - State hook
- `index.ts` - Exports

**Usage:**
```tsx
import { WalletModal, useWalletModal } from '@/components/organisms/WalletModal';

const { isOpen, open, close } = useWalletModal();
<WalletModal isOpen={isOpen} onOpenChange={close} />
```

**Props:**
- `isOpen: boolean` - Modal visibility
- `onOpenChange: (open: boolean) => void` - Handle open/close
- `onSuccess?: (publicKey: string) => void` - Success callback

---

**Last Updated:** 2024-02-23
**Status:** ✅ Implementation Complete - Ready for Testing
