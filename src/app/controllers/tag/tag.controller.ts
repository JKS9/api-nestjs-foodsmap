import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TagService } from 'src/app/services/tag/tag.service';
import { CreateDtoTag } from 'src/common/dto/tag/createTag.dto';
import { DeletetagDto } from 'src/common/dto/tag/deleteTag.dto';
import { UpdateTagDto } from 'src/common/dto/tag/updateTag.dto';

import { AuthGuard } from 'src/common/guards/authentication/auth.guard';

@Controller('/tag')
@UseGuards(AuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() body: CreateDtoTag, @Req() req: Request) {
    return await this.tagService.create(body, req['user']);
  }

  @Get()
  async findAllUser(@Req() req: Request) {
    return await this.tagService.findAllUser(req['user']);
  }

  @Patch()
  async updateOne(@Body() body: UpdateTagDto, @Req() req: Request) {
    return await this.tagService.updateOne(body, req['user']);
  }

  @Delete('/:id')
  async deleteOne(@Req() req: Request, @Param('id') params: DeletetagDto) {
    return await this.tagService.deleteOne(params.id, req['user']);
  }
}
