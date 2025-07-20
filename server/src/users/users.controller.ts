import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return {
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Error retrieving users', err.stack);
      } else {
        this.logger.error(
          'Unknown error retrieving users',
          JSON.stringify(err),
        );
      }
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id);
      return {
        message: 'User found',
        data: user,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(
          `Error finding user with id ${id}: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `Unknown error finding user with id ${id}`,
          JSON.stringify(err),
        );
      }
      throw new NotFoundException('User not found');
    }
  }

  @Post()
  async create(@Body() data: Partial<User>) {
    try {
      const user = await this.usersService.create(data);
      return {
        message: 'User created successfully',
        data: user,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(`Error creating user: ${err.message}`, err.stack);
      } else {
        this.logger.error('Unknown error creating user', JSON.stringify(err));
      }
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<User>,
  ) {
    try {
      const user = await this.usersService.update(id, data);
      return {
        message: 'User updated successfully',
        data: user,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(
          `Error updating user with id ${id}: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `Unknown error updating user with id ${id}`,
          JSON.stringify(err),
        );
      }
      throw new NotFoundException('User not found or update failed');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.remove(id);
      return {
        message: 'User deleted successfully',
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(
          `Error deleting user with id ${id}: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `Unknown error deleting user with id ${id}`,
          JSON.stringify(err),
        );
      }
      throw new NotFoundException('User not found or already deleted');
    }
  }
}
