import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
  ) {}

  @Public()
  @Post('local/signin')
  signInLocal(@Body() dto: AuthDTO) {
    return this.authService.signInLocal(dto);
  }

  @Get('current')
  currentUser(@GetCurrentUser('id') id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
