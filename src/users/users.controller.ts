import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { TagsService } from 'src/tags/tags.service';

@Controller('users')
@UseGuards(JWTAuthGuard)
export class UsersController {
  @Inject(UsersService)
  user: UsersService;

  @Inject(TagsService)
  tag: TagsService;

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Found user',
  })
  findOne(@Req() req: any): Promise<User> {
    return this.user.findOne(req.user.nickname);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  @ApiResponse({
    status: 400,
    description: 'That nickname is already taken',
  })
  @ApiResponse({
    status: 400,
    description: 'That email is already taken',
  })
  async update(@Req() req: any, @Body() data: UpdateUserDto) {
    if (await this.user.findOne(data.nickname)) {
      throw new BadRequestException('That nickname already taken');
    }
    if (await this.user.findOneByEmail(req.user.email)) {
      throw new BadRequestException('That email already taken');
    }
    return this.user.update(req.user.id, data);
  }

  @Delete()
  delete(@Req() req: any) {
    return this.user.delete(req.user.id);
  }

  @Post('tag')
  @ApiResponse({
    status: 200,
    description: 'User tags updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Tag not found',
  })
  async updateTags(@Req() req: any, @Body() data: { tags: number[] }) {
    if (!data.tags.every((tag) => this.tag.findOne(tag))) {
      throw new BadRequestException('Tag not found');
    }
    const tags = await this.user.updateTags(req.user.id, data.tags).tags();
    return {
      tags,
    };
  }

  @Delete('tag/:id')
  @ApiResponse({
    status: 200,
    description: 'User tag deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Tag not found',
  })
  async deleteTag(@Req() req: any, @Query('id') id: number) {
    if (!this.tag.findOne(id)) {
      throw new BadRequestException('Tag not found');
    }
    return this.user.updateTags(req.user.id, [id]);
  }

  @Get('tag/my')
  @ApiResponse({
    status: 200,
    description: 'User tags',
  })
  async getMyTags(@Req() req: any) {
    const tags = await this.user.findOne(req.user.nickname).tags();
    return {
      tags,
    };
  }
}
