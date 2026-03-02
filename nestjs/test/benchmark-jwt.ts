import 'reflect-metadata';
import { JwtStrategy } from '../src/config/jwt/jwt.strategy';
import { UserEntity } from '../src/modules/user/entities/user.entity';
import { UserStatus } from '../src/modules/user/user.contants';

// Mock User
const mockUser = new UserEntity();
mockUser.id = 1;
mockUser.email = 'test@example.com';
mockUser.status = UserStatus.Enabled;
// @ts-expect-error Mocking role property
mockUser.role = 'user'; // Assuming string or enum match

// Manual Mock Implementation
const mockUserRepository = {
  // @ts-expect-error Mocking findOne method
  findOne: async () => {
    // Simulate DB latency (e.g., 5ms)
    await new Promise((resolve) => setTimeout(resolve, 5));
    return mockUser;
  },
};

const mockSecurityConfig = {
  jwtSecret: 'secret',
};

async function runBenchmark() {
  console.log('Starting benchmark...');

  // Manual injection
  // @ts-expect-error Manually injecting mock dependencies
  const strategy = new JwtStrategy(
    mockSecurityConfig as any,
    mockUserRepository as any,
  );

  const payload = { userId: 1, role: 'user' };

  // Warmup
  try {
    await strategy.validate(payload);
  } catch (e) {
    console.error('Warmup failed:', e);
    return;
  }

  const iterations = 100;
  const start = process.hrtime();

  for (let i = 0; i < iterations; i++) {
    await strategy.validate(payload);
  }

  const end = process.hrtime(start);
  const timeInMs = end[0] * 1000 + end[1] / 1e6;
  const avgTime = timeInMs / iterations;

  console.log(
    `Total time for ${iterations} iterations: ${timeInMs.toFixed(2)}ms`,
  );
  console.log(`Average time per validation: ${avgTime.toFixed(4)}ms`);
}

runBenchmark().catch(console.error);
