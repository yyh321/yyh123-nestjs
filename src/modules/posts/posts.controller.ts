import { Controller, Get, Req, Query,Headers, Param, Post, Body, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseGuards(DemoAuthGuard)
export class PostsController {
  constructor( private demoService: DemoService) {
    
  }

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id',ParseIntPipe) id) {
    console.log('id: ', typeof id);
    return {
      title: `Posts ${id}`
    }
  }

  @Post()
  // @UseFilters(DemoFilter)
  @UsePipes(ValidationPipe)
  // @SetMetadata('roles',['member'])
  @Roles('member')
  store(@Body() post:CreatePostDto) {
    this.demoService.create(post);
    // throw new HttpException('没有权限',HttpStatus.FORBIDDEN);
    // throw new ForbiddenException('没有权限 !');
  }
}
