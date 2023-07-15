import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const FormAddPostSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="100%" height={60} />
      <Skeleton variant="text" width="100%" height={60} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
};
