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
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<{ message: string; data: Task[] }> {
    try {
      const tasks = await this.tasksService.findAll();
      this.logger.log('All tasks retrieved successfully');
      return {
        message: 'Tasks retrieved successfully',
        data: tasks,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error('Error retrieving tasks', err.stack);
      } else {
        this.logger.error(
          'Unknown error retrieving tasks',
          JSON.stringify(err),
        );
      }
      throw new HttpException(
        'Error retrieving tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: Task }> {
    try {
      const task = await this.tasksService.findOne(id);
      this.logger.log(`Task with id ${id} retrieved successfully`);
      return {
        message: 'Task found',
        data: task,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(
          `Error finding task with id ${id}: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `Unknown error finding task with id ${id}`,
          JSON.stringify(err),
        );
      }
      throw new NotFoundException('Task not found');
    }
  }

  @Post()
  async create(
    @Body() data: Partial<Task>,
  ): Promise<{ message: string; data: Task }> {
    try {
      const task = await this.tasksService.create(data);
      this.logger.log(`Task created successfully with id ${task.id}`);
      return {
        message: 'Task created successfully',
        data: task,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(`Error creating task: ${err.message}`, err.stack);
      } else {
        this.logger.error('Unknown error creating task', JSON.stringify(err));
      }
      throw new HttpException('Error creating task', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Task>,
  ): Promise<{ message: string; data: Task }> {
    try {
      const task = await this.tasksService.update(id, data);
      this.logger.log(`Task with id ${id} updated successfully`);
      return {
        message: 'Task updated successfully',
        data: task,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(
          `Error updating task with id ${id}: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `Unknown error updating task with id ${id}`,
          JSON.stringify(err),
        );
      }
      throw new NotFoundException('Task not found or update failed');
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    try {
      await this.tasksService.remove(id);
      this.logger.log(`Task with id ${id} deleted successfully`);
      return { message: 'Task deleted successfully' };
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.error(
          `Error deleting task with id ${id}: ${err.message}`,
          err.stack,
        );
      } else {
        this.logger.error(
          `Unknown error deleting task with id ${id}`,
          JSON.stringify(err),
        );
      }
      throw new NotFoundException('Task not found or already deleted');
    }
  }
}
