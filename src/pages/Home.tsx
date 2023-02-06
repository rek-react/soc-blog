import Grid from "@mui/material/Grid";
import { Posts } from "../components/Posts";
import { Tags } from "../components/Tags";

const Home = () => {
  return (
    <Grid container spacing={4}>
      <Grid xs={12} sm={8} item>
        <Posts />
      </Grid>
      <Grid xs={12} sm={4} item>
        <Tags />
      </Grid>
    </Grid>
  );
};
export default Home;
