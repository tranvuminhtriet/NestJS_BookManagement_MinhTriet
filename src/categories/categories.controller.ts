import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { Logger } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { Category } from './category.entity';

@Controller('api/categories')
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
  private logger = new Logger('CategoriesController');
  constructor(private categoriesService: CategoriesService) {}
  @Post()
  createCategory(
    @Body() createCategoryDto: CategoryDto,
    @GetUser() user: User,
  ): Promise<CategoryDto> {
    this.logger.verbose(
      `User: ${user.email} added category: ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Delete('/:id')
  deleteCategory(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Category> {
    this.logger.verbose(`User: ${user.email} Deleted category id: ${id}`);
    return this.categoriesService.deleteCategory(id);
  }

  @Put('/:id')
  updateAuthor(
    @Param('id') id: string,
    @Body() editCategory: CategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    this.logger.verbose(
      `User: ${
        user.email
      } Update category id: ${id} with changes: ${JSON.stringify(
        editCategory,
      )}`,
    );
    return this.categoriesService.updateCategory(id, editCategory);
  }
}
