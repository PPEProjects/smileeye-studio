module.exports = {
  apps: [
    {
      name: 'smileeye-studio',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'npm',
      args: 'run preview'
    }
  ]
}
