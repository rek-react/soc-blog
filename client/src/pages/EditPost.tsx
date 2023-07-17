import Paper from "@mui/material/Paper";
import { FormEditPost } from "../components/Forms/Post/EditPost";

const EditPost = () => {
  return (
    <Paper
      sx={{
        mb: "20px",
        padding: {
          sm: "30px",
          xs: "15px",
        },
      }}
    >
      <FormEditPost />
    </Paper>
  );
};
export default EditPost;
