import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../system/auth/guards/roles.guard';
import { Roles } from '../../system/roles/roles.decorator';
import { Role } from '../../system/roles/roles.interface';
import { User } from '../../admin/user/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiResponse({ type: [User] })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('all')
  async findAll2() {
    return this.userService.findAll();
  }



  @ApiResponse({ type: User })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ type: User })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
