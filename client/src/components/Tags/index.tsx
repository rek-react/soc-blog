import List from "@mui/material/List";
import { useGetTagsQuery } from "../../api/services/postApi";
import { SideBlock } from "../SideBlock";
import { Typography } from "@mui/material";
import { TagSkeleton } from "./components/Tag/Skeleton";
import { Tag } from "./components/Tag";

export const Tags = () => {
  const { data, isFetching, isError } = useGetTagsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  if (isError)
    return (
      <Typography variant="h4" color="red">
        Ошибка получения тэгов
      </Typography>
    );

  return (
    <>
      {
        <SideBlock title="Тэги">
          <List>
            {isFetching ? (
              [...Array(5)].map((_, index) => <TagSkeleton key={index} />)
            ) : data?.length !== 0 ? (
              data?.map((obj) =>
                obj.tags.map((tag) => <Tag key={tag} name={tag} id={obj.id} />)
              )
            ) : (
              <Typography variant="h4" align="center">
                Тэгов нет
              </Typography>
            )}
          </List>
        </SideBlock>
      }
    </>
  );
};
