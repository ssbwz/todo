import TodoItemsList from "../components/todoItemsList";
import { Grid } from '@mui/material';
function TODOPage() {
    return <>
        <Grid item
            lg={6}
            md={9}
            sm={8}>
            <TodoItemsList />
        </Grid>
    </>
}
export default TODOPage;