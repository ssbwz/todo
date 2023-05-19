import { Grid } from '@mui/material';
import FakeText from '../components/fakeText'

function HomePage() {
    return <>
        <Grid container
            justifyContent={'center'}
            style={{ marginTop: '20px' }}
        >
            <Grid item lg={9} sm={9} md={9}>
                <FakeText />
            </Grid>
        </Grid>
    </>
}
export default HomePage;