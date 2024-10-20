import { UserService } from '../modules/user/user.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('userService testing', () => {
  let userService: UserService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('UserService should be define', async () => {
    expect(userService).toBeDefined();
  });
});
