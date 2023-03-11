export class FindRecipeDto {
  tags?: string[];
  ingredients?: string[];
  name?: string;
  limit?: number;
  skip?: number;
}
