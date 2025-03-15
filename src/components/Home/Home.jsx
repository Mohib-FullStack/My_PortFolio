import { Box } from '@mui/material';
import Hero from '../Hero';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/assets/herobg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Hero />
    </Box>
  );
};

export default Home;









