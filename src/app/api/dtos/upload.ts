interface UpdloadFilesDto {
  files: File[];
}

interface UpdloadEntryFieldDto extends UpdloadFilesDto {
  refId: string;
  ref: string;
  source?: string;
  field: string;
}

export type UpdloadDto = UpdloadFilesDto | UpdloadEntryFieldDto;

export function isUploadFilesDto(dto: UpdloadDto): dto is UpdloadFilesDto {
  return (dto as UpdloadFilesDto).files !== undefined;
}

export function isUploadEntryFieldDto(
  dto: UpdloadDto,
): dto is UpdloadEntryFieldDto {
  return (
    (dto as UpdloadEntryFieldDto).refId !== undefined &&
    (dto as UpdloadEntryFieldDto).ref !== undefined &&
    (dto as UpdloadEntryFieldDto).field !== undefined
  );
}
