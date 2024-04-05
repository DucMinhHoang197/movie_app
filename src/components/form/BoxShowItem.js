import React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function BoxShowItem({ movie }) {
  const [imageURL, setImageURL] = useState(
    `https://media.themoviedb.org/t/p/w1920_and_h1080_multi_faces${movie.backdrop_path}`
  );
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (
      imageURL ===
      "https://media.themoviedb.org/t/p/w1920_and_h1080_multi_facesnull"
    ) {
      setImageURL("/image/videoImage.jpg");
    }
  }, [imageURL]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Grid bgcolor="red" container spacing={2}>
        <Grid item xs={6} md={8}>
          <Card sx={{ Width: 200, Height: 200 }}>
            <CardMedia
              height="150"
              component="img"
              className="poster"
              // key={id}
              src={imageURL}
              alt={movie.title || "movie image"}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {movie?.name?.length > 0 ? movie.name : movie.title}
              </Typography>
            </CardContent>

            <CardActions>
              <Button onClick={handleOpen} size="small">
                Learn More
              </Button>
            </CardActions>
          </Card>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {`Text in a modal ${movie.name}`}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          {/* <MovieModal
                  open={open}
                  onClose={handleClose}
                  overview={selectedOverview}
                /> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default BoxShowItem;
