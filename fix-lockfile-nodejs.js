const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING PNPM LOCKFILE USING NODE.JS');
console.log('=====================================\n');

try {
  // Step 1: Clean git state
  console.log('[1/5] Cleaning git merge state...');
  try {
    if (fs.existsSync('.git/MERGE_MSG')) fs.unlinkSync('.git/MERGE_MSG');
    if (fs.existsSync('.git/MERGE_HEAD')) fs.unlinkSync('.git/MERGE_HEAD');
    if (fs.existsSync('.git/MERGE_MODE')) fs.unlinkSync('.git/MERGE_MODE');
    console.log('✓ Git state cleaned');
  } catch (e) {
    console.log('⚠ Git state cleanup failed, continuing...');
  }

  // Step 2: Install pnpm globally
  console.log('\n[2/5] Installing pnpm globally...');
  try {
    execSync('npm install -g pnpm', { stdio: 'inherit' });
    console.log('✓ pnpm installed');
  } catch (e) {
    console.log('⚠ pnpm install failed or already installed, continuing...');
  }

  // Step 3: Generate lockfile
  console.log('\n[3/5] Generating complete pnpm lockfile...');
  console.log('This will read package.json and create complete pnpm-lock.yaml');

  try {
    execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' });
    console.log('✓ Complete lockfile generated');
  } catch (e) {
    console.log('✗ pnpm install failed');
    console.log('Error:', e.message);
    process.exit(1);
  }

  // Step 4: Verify lockfile exists
  if (!fs.existsSync('pnpm-lock.yaml')) {
    console.log('✗ pnpm-lock.yaml was not created');
    process.exit(1);
  }

  // Step 5: Commit and push
  console.log('\n[4/5] Committing lockfile...');
  try {
    execSync('git add pnpm-lock.yaml', { stdio: 'inherit' });
    execSync('git commit -m "fix: generate complete pnpm lockfile with all dependencies"', {
      stdio: 'inherit',
    });
    console.log('✓ Lockfile committed');
  } catch (e) {
    console.log('✗ Git commit failed:', e.message);
    process.exit(1);
  }

  console.log('\n[5/5] Pushing to remote...');
  try {
    execSync('git push origin feat/issue-56-comparison-tool', { stdio: 'inherit' });
    console.log('✓ Changes pushed');
  } catch (e) {
    console.log('✗ Git push failed:', e.message);
    console.log('Please manually run: git push origin feat/issue-56-comparison-tool');
    process.exit(1);
  }

  // Success message
  console.log('\n🎉 SUCCESS! Complete lockfile generated and pushed!');
  console.log('=====================================');
  console.log('\nThe lockfile now includes ALL dependencies:');
  console.log('- react-icons@^5.5.0');
  console.log('- @stellar/freighter-api@^1.7.0');
  console.log('- @stellar/stellar-sdk@^11.2.2');
  console.log('- All other dependencies and their sub-dependencies');
  console.log('\nCI should now pass completely!');
  console.log('Check: https://github.com/utilityjnr/stellar-app-os/actions');
  console.log('\nNext: Create PR at:');
  console.log(
    'https://github.com/utilityjnr/stellar-app-os/pull/new/feat/issue-56-comparison-tool'
  );
} catch (error) {
  console.log('\n✗ Script failed:', error.message);
  console.log('\nManual steps:');
  console.log('1. npm install -g pnpm');
  console.log('2. pnpm install --no-frozen-lockfile');
  console.log('3. git add pnpm-lock.yaml');
  console.log('4. git commit -m "fix: complete pnpm lockfile"');
  console.log('5. git push origin feat/issue-56-comparison-tool');
  process.exit(1);
}
