const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Dashboard Application...\n');

// Start the backend server
console.log('📡 Starting backend server...');
const server = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  cwd: __dirname
});

// Wait a moment for server to start
setTimeout(() => {
  console.log('⚛️  Starting React frontend...');
  
  // Start the React frontend
  const frontend = spawn('npm', ['start'], {
    stdio: 'inherit',
    cwd: __dirname,
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down application...');
    server.kill();
    frontend.kill();
    process.exit(0);
  });

  frontend.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
    server.kill();
  });

}, 2000);

server.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

server.on('error', (err) => {
  console.error('Failed to start backend server:', err);
});
