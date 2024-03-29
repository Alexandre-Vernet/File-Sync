const validateEnvVariables = () => {
    const requiredEnvVariables = [
        'NODE_ENV',
        'PORT',
        'AUTHORIZED_ORIGIN',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_PRIVATE_KEY',
        'FIREBASE_CLIENT_EMAIL',
        'FIREBASE_STORAGE_BUCKET',
        'ACCESS_TOKEN_SECRET',
    ];

    const missingEnvVariables = requiredEnvVariables.filter(variable => !process.env[variable]);

    if (missingEnvVariables.length > 0) {
        console.error(`Missing required environment variables: ${ missingEnvVariables.join(', ') }`);
        process.exit(1);
    }
}


module.exports = validateEnvVariables;
