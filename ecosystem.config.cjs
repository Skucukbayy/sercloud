module.exports = {
    apps: [
        {
            name: 'ser-cloud',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            instances: 'max', // Use all available CPU cores
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            error_file: './logs/pm2-error.log',
            out_file: './logs/pm2-out.log',
            merge_logs: true,
        },
    ],
};
