import Hero from '../Hero';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/src/assets/herobg.png')",
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









