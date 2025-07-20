import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const data = await this.authService.login(body.email, body.password);
      return {
        message: 'Login successful',
        ...data,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(`Login failed: ${err.message}`, err.stack);
      } else {
        this.logger.error('Unknown login error', JSON.stringify(err));
      }
      throw err;
    }
  }
}
