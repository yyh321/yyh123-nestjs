import { Controller, Get, Req, Query,Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
  constructor( private demoService: DemoService) {
    
  }

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param() params) {
    return {
      title: `Posts ${params.id}`
    }
  }

  @Post()
  // @UseFilters(DemoFilter)
  store(@Body() post:CreatePostDto) {
    // this.demoService.create(post);
    // throw new HttpException('没有权限',HttpStatus.FORBIDDEN);
    throw new ForbiddenException('没有权限 !');
  }
}
