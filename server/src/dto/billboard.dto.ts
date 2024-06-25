export interface CreateBillboardDto {
  label: string;
  image_url: string;
  user_id: string;
  category_id: string;
}

export type EditBillboardDto = CreateBillboardDto;
