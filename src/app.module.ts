import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { TagsModule } from './tags/tags.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule, TagsModule, UsersService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
