import { Box, CircularProgress, Typography } from "@mui/material";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {/* Loader Circle */}
        <CircularProgress color="secondary" size={50} />
        <Typography
          variant="h6"
          style={{
            fontWeight: 800,
            marginTop: 20,
            color: "#F1F1F1",
          }}
        >
          {progress.toFixed(2)}%
        </Typography>
      </Box>
    </Html>
  );
};

export default CanvasLoader;
