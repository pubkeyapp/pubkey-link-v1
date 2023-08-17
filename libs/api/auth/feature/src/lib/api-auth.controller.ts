import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common'

import { ApiAuthDiscordGuard, ApiAuthService, AuthRequest } from '@pubkey-link/api/auth/data-access'
import { Response } from 'express'

@Controller('auth')
export class ApiAuthController {
  private readonly logger = new Logger(ApiAuthController.name)
  constructor(private readonly service: ApiAuthService) {}

  @Get('discord')
  @UseGuards(ApiAuthDiscordGuard)
  discord() {
    return
  }

  @Get('discord/callback')
  @UseGuards(ApiAuthDiscordGuard)
  async discordAuthCallback(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
    await this.service.setUserCookie({ req, res, user: req.user })
    res.redirect(this.service.core.config.webUrl + '/dashboard')
  }
}
