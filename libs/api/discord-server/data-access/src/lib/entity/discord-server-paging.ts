import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api/core/data-access'
import { DiscordServer } from './discord-server.entity'

@ObjectType()
export class DiscordServerPaging extends PagingResponse<DiscordServer>(DiscordServer) {}
