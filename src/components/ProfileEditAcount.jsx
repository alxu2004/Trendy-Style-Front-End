
import { SideBarProfile } from "./SideBarProfile";
import { TextField, Button, Typography } from '@mui/material';

export const ProfileEditAcount = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <SideBarProfile/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginLeft: '20px', border:"2px solid black" , padding: "30px" , borderRadius: "20px"}}>
          <Typography variant="h4" style={{textAlign: "center"}} >Edit Profile</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <TextField
                type="text"
                id="name"
                name="name"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <TextField
                type="email"
                id="email"
                name="email"
                variant="outlined"
                fullWidth
                required
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
