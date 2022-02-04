var strategy = require('typeorm-naming-strategies');

var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'mysql',
      host: 'localhost',
      database: 'skinet',
      port: 33067,
      username: 'root',
      password: '123456',
      entities: ['**/*.entity.js'],
      // migrationsRun: true,
      synchronize: true,
      namingStrategy: new strategy.SnakeNamingStrategy(),
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown env!');
}

module.exports = dbConfig;
