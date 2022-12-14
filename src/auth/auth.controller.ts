import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { Public } from 'src/common/decorators/public.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthDTO, ChangePasswordDTO, RegisterDTO } from './dto';

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

  @Public()
  @Post('local/register')
  registerLocal(@Body() dto: RegisterDTO) {
    return this.authService.registerLocal(dto);
  }

  @Get('current')
  currentUser(@GetCurrentUser('id') id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  @Post('local/changepassword')
  changePassword(
    @GetCurrentUser('id') id: string,
    @Body() dto: ChangePasswordDTO,
  ) {
    return this.authService.changePassword(dto, id)
  }
}
